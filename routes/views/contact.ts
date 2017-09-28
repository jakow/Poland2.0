import {RequestHandler} from 'express';
import {list, View} from 'keystone';
import {stripIndent} from 'common-tags';
import * as moment from 'moment';
import {CREATED, UNPROCESSABLE_ENTITY, INTERNAL_SERVER_ERROR} from 'http-status-codes';
import {pick} from 'lodash';
import * as validate from 'validate.js';
import {Enquiry} from '../../models/Enquiry';
import emails from '../emails';
import {notificationEmail, targetEmail, environment} from '../../config';

const PHONE_REGEX = /^\s*\+?[0-9\s]+$/; // permit spaces and a leading plus
// override email regex not to permit empty strings
// validate.validators.email.PATTERN = EMAIL_REGEX;
(validate.validators as any).phone = (value: any, options: any, key: any, attributes: any) => {
  if (!PHONE_REGEX.test(value)) {
    return options.message || 'is not a valid phone number';
  }
};

const enquiryFields: Array<keyof Enquiry> = ['name', 'email', 'phone', 'company', 'subject', 'text'];

const contactFormConstraints = {
  name: {
    presence: true,
    length: {
      minimum: 1,
      message: '^needs to have at least 1 character',
    },
  },
  email: {
    presence: true,
    email: {
      message: '^This is not a valid e-mail',
    },
  },
  subject: {
    presence: true,
    length: {
      minimum: 1,
      message: '^Please choose a subject',
    },
  },
  text: {
    presence: true,
    length: {
      maximum: 500,
      tooLong: '^Your question needs to be less than %{count} characters',
    },
  },
};

// TODO: add a spam-busting solution
export const contact: RequestHandler = async (req, res, next) => {
  const method = req.method;
  const view = new View(req, res);
  const isAjax = req.query.ajax;
  if (method !== 'POST') {
    // not a valid contact endpoint
    return next();
  }

  // likely not a real user but a bot
  if (!isAjax) {
    return next(); // 404
  }
  const formData =  pick(req.body, enquiryFields) as Enquiry;
  const errors = validate(formData, contactFormConstraints);

  if (errors) {
    res.status(UNPROCESSABLE_ENTITY).json({message: 'error', errors});
  } else {
    try {
      const enquiry = await createEnquiry(formData);
      res.status(CREATED).json({message: 'ok'});
      // if created, also send a notification email
      if (environment === 'production') {
        await sendEmail(enquiry);
      }
    } catch (e) {
      res.sendStatus(INTERNAL_SERVER_ERROR);
    }
  }
};

function createEnquiry(formData: Enquiry) {
  return list<Enquiry>('Enquiry').model.create(formData);
}

function sendEmail(enquiry: Enquiry) {
  // tslint:disable:max-line-length
  const email = {
    from: `"Poland 2.0 Notifications" <${notificationEmail}>`,
    to: targetEmail,
    subject: 'New enquiry received',
    text: stripIndent`
    This e-mail is to notify that a new enquiry has been submitted at the Poland 2.0 website on ${moment(enquiry.date).toLocaleString()}:
    From: ${enquiry.name} | <email: ${enquiry.email} | phone: ${enquiry.phone || 'none'}>
    Company/organization: ${enquiry.company}
    Subject: ${enquiry.subject}
    Question: ${enquiry.text}

    Please reply promptly!`,
  };
  return new Promise<void>((resolve, reject) => {
    emails.sendMail(email, (err, info) => {
      if (err) {
        console.error('[contact] Email send failed');
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

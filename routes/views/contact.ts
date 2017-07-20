import {list, View} from 'keystone';
import {RequestHandler} from 'express';
import resolveView from '../helpers/resolveView';
import {pick} from 'lodash';
// import validate = require('validate.js');
import validate = require('validate.js');

// tslint:disable-next-line:max-line-length
const PHONE_REGEX = /^\s*\+?[0-9\s]+$/; // permit spaces and a leading plus
// override email regex not to permit empty strings
// validate.validators.email.PATTERN = EMAIL_REGEX;
validate.validators.phone = (value: any, options: any, key: any, attributes: any) => {
  if (!PHONE_REGEX.test(value)) {
    return options.message || 'is not a valid phone number';
  }
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  question: string;
}

const contactFormFields: Array<keyof ContactFormData> = ['name', 'email', 'phone', 'company', 'subject', 'question'];

const constraints = {
  name: {
    presence: true,
    length: {
      minimum: 1,
    },
  },
  email: {
    presence: true,
    email: true,
  },
  phone: {
    phone: true,
  },
  question: {
    presence: true,
    length: {
      minimum: 3,
      tooShort: 'needs to have %{count} words or more',
      // count words
      tokenizer: (value: string) => value.split(/\s+/g),
    },
  },
};

export const contact: RequestHandler = (req, res, next) => {
  const method = req.method;
  const view = new View(req, res);
  if (method === 'GET') {
    view.render(resolveView('contact'));
  } else if (method === 'POST') {
    const formData =  pick(req.body, contactFormFields) as ContactFormData;
    const validation = validate(formData, constraints);
    const isAjax = req.params.ajax;
    res.send({formData, validation});
  } else {
    next(); // fail!
  }
};

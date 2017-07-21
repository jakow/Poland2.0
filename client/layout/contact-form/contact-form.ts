import {debounce} from 'lodash';
import validate from 'validate.js';
import Form from '../../components/form/form';

// override email regex not to permit empty strings
// validate.validators.email.PATTERN = EMAIL_REGEX;

export const contactFormConstraints = {
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
      message: '^is not valid',
    },
  },
  phone: {
    phone: {message: '^is not valid'},
  },
  subject: {
    presence: true,
    length: {
      minimum: 1,
      message: '^Please choose a subject',
    },
  },
  question: {
    presence: true,
    length: {
      minimum: 3,
      tooShort: '^needs to have %{count} words or more',
      // count words
      tokenizer: (value: string) => value.split(/\s+/g),
    },
  },
};

export default class ContactForm extends Form {
  constructor(form: HTMLFormElement) {
    super(form, contactFormConstraints);
  }
}

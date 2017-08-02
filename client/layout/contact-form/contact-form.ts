import {debounce} from 'lodash';
import validate from 'validate.js';
import Form from '../../components/form/form';
import Modal from '../../components/modal/modal';

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
  text: {
    presence: true,
    length: {
      minimum: 3,
      tooShort: '^needs to have %{count} words or more',
      // count words
      tokenizer: (value: string) => value.split(/\s+/g),
    },
  },
};

const SCREEN_CLASS = 'contact-form__success-screen';
const SHOW_CLASS = SCREEN_CLASS + '--show';

export default class ContactForm extends Form {
  private successScreen: HTMLElement;
  constructor(form: HTMLFormElement) {
    super(form, contactFormConstraints);
    this.successScreen = form.querySelector('.' + SCREEN_CLASS) as HTMLElement;
  }
  public handleSubmitSuccess(response: any) {
    super.handleSubmitSuccess(response);
    this.showSuccessScreen();
  }

  public showSuccessScreen() {
    this.successScreen.classList.add(SHOW_CLASS);
  }

  public hideSuccessScreen() {
    this.successScreen.classList.remove(SHOW_CLASS);
  }
}

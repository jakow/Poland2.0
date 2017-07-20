import validate from 'validate.js';
import {debounce} from 'lodash';

const DEBOUNCE_AMOUNT = 500;
const PHONE_REGEX = /^\s*\+?(\d(\s|\-)?)+$/; // permit spaces, dashes and a leading plus
validate.validators.phone = (value: any, options: any, key: any, attributes: any) => {
  if (!PHONE_REGEX.test(value)) {
    return options.message || 'is not a valid phone number';
  }
};

export function initForms() {
  for (const input of Array.from(document.querySelectorAll('.form input, .form textarea'))) {
    const i = input as (HTMLInputElement | HTMLTextAreaElement);
    if (i.value.length === 0) {
      i.classList.remove('input-not-empty');
    } else {
      i.classList.add('input-not-empty');
    }
    input.addEventListener('change', (ev) => { // ts-lint:disable-line
      const target = ev.target as (HTMLInputElement | HTMLTextAreaElement);
      if (target.value.length === 0) {
        target.classList.remove('input-not-empty');
      } else {
        target.classList.add('input-not-empty');
      }
    });
  }
}

export default class Form {
  constructor(form: HTMLFormElement, private constraints: any) {
    // to make server identify a js endpoint add the 'ajax=true' string
    form.action += '?ajax=true';
    // to override html5 validation in favor of js validation
    form.noValidate = true;
    const fields = Array.from(form.querySelectorAll('input, textarea')) as
      Array<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
    for (const field of fields) {
      field.addEventListener('input', debounce((ev: Event) => {
        const fieldName = field.name;
        if (constraints.hasOwnProperty(fieldName)) {
          // rather than rely on validation API, validate.js is used to have a match between
          // what server (which also uses validate.js) and client accepts
          const error: string[] = validate.single(field.value, (constraints as any)[fieldName]);
          if (error) {
            this.addError(field, error[0]);
          }
        }
      }, DEBOUNCE_AMOUNT));

    }
    form.addEventListener('submit', this.onSubmit);
  }

  public onSubmit = (ev: Event) => {
    ev.preventDefault();
  }

  public addError(field: HTMLElement, error: string) {
    console.error(error);
  }
}

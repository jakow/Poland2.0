import validate from 'validate.js';
import {debounce} from 'lodash';
const FIELD_CLASS = 'form-field';
const ERROR_CLASS = 'form-field--error';
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

export type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export default class Form {
  constructor(protected form: HTMLFormElement, protected constraints: any) {
    // to make server identify a js endpoint add the 'ajax=true' string
    form.action += '?ajax=true';
    // to override html5 validation in favor of js validation
    form.noValidate = true;
    // get all fields
    for (const field of this.getFields(true)) {
      field.addEventListener('input', debounce((ev: Event) => {
        const fieldName = field.name;
          // rather than rely on validation API, validate.js is used to have a match between
          // what server (which also uses validate.js) and client accepts
        const error: string[] = validate.single(field.value, (constraints as any)[fieldName]);
        if (error) {
          this.addError(field, error[0]);
        } else {
          this.removeError(field);
        }
      }, DEBOUNCE_AMOUNT));

    }
    form.addEventListener('submit', this.onSubmit);
  }

  public onSubmit = (ev: Event) => {
    ev.preventDefault();
    const validatedFields = this.getFields(true);
    const data = this.extractData(validatedFields);
    const errors = validate(data, this.constraints);
    for (const field of validatedFields) {
      if (errors[field.name]) {
        this.addError(field, errors[field.name][0]);
      } else {
        this.removeError(field);
      }
    }
  }

  public addError(field: FormElement, error: string) {
    // console.error(error);
    const el = field.parentElement;
    el.classList.add(ERROR_CLASS);
    const label = el.querySelector('label');
    label.innerText = error;
  }

  public removeError(field: FormElement) {
    const el = this.getFieldContainer(field);
    console.log(el);
    el.classList.remove(ERROR_CLASS);
    const label = el.querySelector('label');
    label.innerText = '';
  }

  private extractData(fields: FormElement[]) {
    const data: {[name: string]: any} = {};
    for (const field of fields) {
      data[field.name] = field.value;
    }
  }

  private getFieldContainer(field: HTMLElement) {
    let parent = field.parentElement;
    while (!parent.classList.contains(FIELD_CLASS)) {
      parent = parent.parentElement;
    }
    return parent;
  }
  private getFields(validatedOnly: boolean = false) {
    const controls = Array.from(this.form.elements) as FormElement[];
    const fields = controls.filter((control) => control.type !== 'submit');
    if (validatedOnly) {
      return fields.filter((field) => this.constraints.hasOwnProperty(field.name));
    } else {
      return fields;
    }
  }
}

import {debounce} from 'lodash';
import validate from 'validate.js';
import jump from 'jump.js';
import {headerAwareTargetOffset} from '../../clientUtils';
const FIELD_CLASS = 'form-field';
const ERROR_CLASS = 'form-field--error';
const DEBOUNCE_AMOUNT = 500;

const PHONE_REGEX = /^\s*\+?(\d(\s|\-)?)*$/; // permit spaces, dashes and a leading plus
(validate.validators as any).phone = (value: any, options: any, key: any, attributes: any) => {
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

export type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/**
 * Generic Form class which handles custom validation and automatic ajax form submission
 * Should be subclassed per each form. On s
 */
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
  /**
   * Handle submission of the form by validating the fields first and then
   * calling submit() method with the form data.
   */
  public onSubmit = (ev: Event) => {
    ev.preventDefault();
    const validatedFields = this.getFields();
    const data = this.extractData(validatedFields);
    const errors = validate(data, this.constraints);

    for (const field of validatedFields) {
      if (errors && errors[field.name]) {
        this.addError(field, errors[field.name][0]);
      } else {
        this.removeError(field);
      }
    }

    if (errors) {
      return this.onValidateError(errors);
    } else {
      this.submit(data);
    }
  }
  /**
   * Submit the form ad
   * @param data JSON form data
   */
  public async submit(data: any) {
    const url = this.form.action;
    let response: Response;
    let result: any;
    try {
      response = await fetch(url, {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(data),
      });
      result = response.json();
      this.handleSubmitSuccess(result);
    } catch (e) {
      this.handleSubmitError(e);
    }
  }

  public clear() {
    for (const field of this.getFields()) {
      field.value = '';
    }
  }

  /**
   * Do tasks after the form is successfully submitted.
   * Override this method in your subclass.
   * @param response The successful JSON response object from server
   */
  public handleSubmitSuccess(response: any) {
    console.log(response);
  }

  /**
   * Handle error returned when form was not successfully submitted.
   * @param error The error returned by the server
   */
  public handleSubmitError(error: any) {
    console.error(error);
  }

  /**
   * Handle error when pre-submit validation has failed.
   * default behaviour is scroll to the first field with error.
   * @param error The error map that occurred: (fieldName -> error[]);
   */
  public onValidateError(error: any) {
    console.error(error);
    const validatedFields = this.getFields();
    for (const field of validatedFields) {
      if (error && error[field.name]) {
        jump(field, {
          offset: headerAwareTargetOffset(field),
          duration: 300,
        });
        return;
      }
    }
  }

  /**
   * Add an error feedback to a form field in order for the user to take
   * corrective action.
   * @param field The field that has an error
   * @param error The error message for the user
   */
  public addError(field: FieldElement, error: string) {
    // console.error(error);
    const el = field.parentElement;
    el.classList.add(ERROR_CLASS);
    const errorContainer = el.querySelector('.form-field__error-container') as HTMLElement;
    errorContainer.innerText = error;
  }

  /**
   * Remove error feedback from given field.
   * @param field
   */
  public removeError(field: FieldElement) {
    const el = this.getFieldContainer(field);
    el.classList.remove(ERROR_CLASS);
    const errorContainer = el.querySelector('.form-field__error-container') as HTMLElement;
    errorContainer.innerText = '';
  }

  /**
   * Extract JSON data from the fields
   * @param fields HTML form controls to extract data from
   * @return JSON data from the fields
   */
  private extractData(fields: FieldElement[]) {
    const data: {[name: string]: any} = {};
    for (const field of fields) {
      data[field.name] = field.value;
    }
    return data;
  }

  private getFieldContainer(field: HTMLElement) {
    let parent = field.parentElement;
    // kind of dangerous and may cause an infinite loop
    while (!parent.classList.contains(FIELD_CLASS)) {
      parent = parent.parentElement;
    }
    return parent;
  }
  /**
   * Get HTML field elements (input, select, textarea) in this form.
   * Inputs of type 'submit' are ignored
   * @param validatedOnly set true to return only those fields that are in the validation schema
   * @return HTML field elements in the form
   */
  private getFields(validatedOnly: boolean = false) {
    const controls = Array.from(this.form.elements) as FieldElement[];
    const fields = controls.filter((control) => control.type !== 'submit');
    if (validatedOnly) {
      return fields.filter((field) => this.constraints.hasOwnProperty(field.name));
    } else {
      return fields;
    }
  }
}

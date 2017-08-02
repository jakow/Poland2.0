import Modal from '../../components/modal/modal';
import ContactForm from '../contact-form/contact-form';

export default class ContactFormModal extends Modal {
  public form: ContactForm;
  constructor(container: HTMLElement) {
    super(container);
    this.form = new ContactForm(container.querySelector('form'));
  }
  public close() {
    super.close();
    this.form.hideSuccessScreen();
    this.form.clear();
  }
}

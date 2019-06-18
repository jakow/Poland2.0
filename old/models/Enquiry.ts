import {List, Field} from 'keystone';
import * as mongoose from 'mongoose';
const Types = Field.Types;
export interface Enquiry {
  date: Date;
  subject: string;
  text: string;
  email: string;
  name?: string;
  company?: string;
  phone?: string;
}
const Enquiry = new List<Enquiry>('Enquiry');

Enquiry.add({
  text: String,
  subject: String,
  name: String,
  email: Types.Email,
  company: String,
  phone: String,
  date: Date,
});

Enquiry.schema.pre('save', function(this: Enquiry, done: () => void) {
  if (!this.date) {
    this.date = new Date();
  }
  done();
});

Enquiry.register();

export default Enquiry;

import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
import {MongoError} from 'mongodb';
const Types = keystone.Field.Types;

export interface Question {
  text: string;
  askedBy: string;
  forEvent: keystone.Schema.Relationship;
  toPerson: keystone.Schema.Relationship;
  dateCreated: Date;
  accepted: boolean;
  dateAccepted: Date;
  archived: boolean;
}

export type QuestionDocument = keystone.ModelDocument<Question>;

export const Question = new keystone.List<Question>('Question',
{
  autokey: { path: 'slug', from: 'text', unique: true },
  defaultSort: 'dateAccepted',
});

Question.add({
  askedBy: {type: String},
  text: {type: String, required: [true, 'Question text is required'], initial: true},
  forEvent: {type: Types.Relationship, ref: 'AgendaEvent', description: 'Agenda event in question (optional)'},
  toPerson: {type: Types.Relationship, ref: 'Speaker',
  description: 'Person to whom the question is directed (optional)'},
}, 'Admin', {
  dateCreated: {type: Date, utc: true},
  accepted: {type: Boolean, default: false},
  dateAccepted: {type: Date, utc: true},
  archived: {type: Boolean, default: false},
});

/**
 * Keystone does not register new hooks after register was called, so for the realtime api,
 * the hooks are proxied via own methods registerHook and unregisterHook registered at runtime
 */

 /**
  * Add dates to the question document
  */
Question.schema.pre('save', function(this: QuestionDocument, next) {
  if (!this.dateCreated) {
    this.dateCreated = new Date();
  }
  if (!this.accepted) {
    this.dateAccepted = null;
  } else if (this.dateAccepted === null) {
    this.dateAccepted = new Date();
  }
  next();
});

Question.defaultColumns = 'text|50%, accepted';
Question.register();

export default Question;

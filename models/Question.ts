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
  autokey: { path: 'slug', from: 'name', unique: true },
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

type Hook = (doc: QuestionDocument) => void;

const saveHooks = new Set<Hook>();
const removeHooks = new Set<Hook>();

/**
 * Keystone does not register new hooks after register was called, so the hooks
 * are proxied via own methods registerHook and unregisterHook registered at runtime
 */
Question.schema.pre('save', function(next) { // tslint:disable-line
  const doc = this as QuestionDocument;
  if (!doc.dateCreated) {
    doc.dateCreated = new Date();
  }

  if (doc.accepted) {
    if (doc.dateAccepted === null) {
      doc.dateAccepted = new Date();
    }
  } else {
    doc.dateAccepted = null;
  }
  next();
});

Question.schema.post('remove', function(doc) { // tslint:disable-line
  removeHooks.forEach((hook) => hook(doc as any));
});

Question.defaultColumns = 'text|50%, event';
Question.register();

export default Question;

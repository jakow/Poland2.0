import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
import {MongoError} from 'mongodb';
const Types = keystone.Field.Types;

export interface Question {
  text: string;
  askedBy: string;
  event: keystone.Schema.Relationship;
  accepted: boolean;
  archived: boolean;
}

export type QuestionDocument = keystone.ModelDocument<Question>;

export const Question = new keystone.List<Question>('Question');

Question.add({
  askedBy: {type: String},
  text: {type: String, required: true, initial: true},
  event: {type: Types.Relationship, ref: 'AgendaEvent', description: 'Agenda event in question'},

}, 'Admin', {
  accepted: Boolean,
  archived: Boolean,
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
  saveHooks.forEach((hook) => hook(doc));
  next();
});

Question.schema.post('remove', function(doc) { // tslint:disable-line
  removeHooks.forEach((hook) => hook(doc as any));
});

Question.defaultColumns = 'text|50%, event';
Question.register();

export default Question;

export function registerHook(method: 'save' | 'remove', hook: Hook) {
  let hookType;
  if (method === 'save') {
    hookType = saveHooks;
  } else if (method === 'remove') {
    hookType = removeHooks;
  } else {
    throw new Error('Invalid question save hook type');
  }
  hookType.add(hook);
}

export function unregisterHook(hook: Hook) {
  if (saveHooks.has(hook)) {
    saveHooks.delete(hook);
  }
}

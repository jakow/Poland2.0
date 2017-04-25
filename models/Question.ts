import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
const Types = keystone.Field.Types;

export interface QuestionDocument extends mongoose.Document {
  text: string;
  name: string;
  event: keystone.Schema.Relationship;
}

const Question = new keystone.List<QuestionDocument>('Question');

Question.add({
  text: {type: String, required: true},
  name: {type: String},
  event: {type: Types.Relationship, description: 'Agenda event in question'},
});

Question.defaultColumns = 'text|50%, event';

Question.register();

export default Question;

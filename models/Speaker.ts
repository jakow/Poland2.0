import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
const Types = keystone.Field.Types;

export interface Speaker  {
  name: string;
  speakerCategory: keystone.Schema.Relationship;
  position: string;
  company: string;
  photo: keystone.Schema.CloudinaryImage;
  description: string;
  edition: keystone.Schema.Relationship[];
}

export type SpeakerDocument = keystone.Document<Speaker>;

const Speaker = new keystone.List<Speaker>('Speaker', {
  autokey: { path: 'slug', from: 'name', unique: true },
  map: { name: 'name' },
  sortable: true,
  sortContext: 'Edition:speakers',
});

Speaker.add({
  name: {type: String, required: true},
  speakerCategory: {type: Types.Relationship, ref: 'SpeakerCategory'},
  position: {type: String},
  company: {type: String},
  photo: {type: Types.CloudinaryImage, autoCleanup: true },
  description: {type: Types.Markdown, height: 150},
  edition: {type: Types.Relationship, ref: 'Edition', many: true},
});

Speaker.defaultColumns = 'name, speakerCategory, edition';
Speaker.register();

export default Speaker;

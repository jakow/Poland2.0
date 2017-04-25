import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
const Types = keystone.Field.Types;

interface SpeakerDocument extends mongoose.Document {
  name: string;
  speakerCategory: keystone.Schema.Relationship;
  position: string;
  company: string;
  photo: keystone.Schema.CloudinaryImage;
  description: string;
}

const Speaker = new keystone.List<SpeakerDocument>('Speaker', {
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
  description: {type: Types.Html, wysiwyg: true, height: 150},
  edition: {type: Types.Relationship, ref: 'Edition'},
});

Speaker.defaultColumns = 'name, speakerType, edition';

Speaker.register();

export default Speaker;




import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
const Types = keystone.Field.Types;


interface SpeakerCategoryDocument extends mongoose.Document {
  name: string;
  displayName: string;
  edition: keystone.Schema.Relationship;
}

const SpeakerCategory = new keystone.List<SpeakerCategoryDocument>('SpeakerCategory', {
  autokey: { from: 'name', path: 'key', unique: true },
  sortable: true,
  sortContext: 'Edition:sponsor-categories',
});

SpeakerCategory.add({
  name: { type: String, required: true },
  displayName: {type: String, required: true, initial: true},
  // perColumn: {type: Number, label: 'Speaker cards per column'},
  // maxWidth: {type: Number, label: 'Maximum card width (px, em, rem)'},
  edition: {type: Types.Relationship, ref: 'Edition', many: true},
});

SpeakerCategory.register();

export default SpeakerCategory;

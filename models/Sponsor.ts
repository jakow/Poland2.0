import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
const Types = keystone.Field.Types;

export interface Sponsor  {
  name: string;
  logo: keystone.Schema.CloudinaryImage;
  description: string;
  url: string;
  imageAdjust: {
    width: number;
    height: number;
  };
  edition: keystone.Schema.Relationship;
  category: keystone.Schema.Relationship;
  showInPrevious: boolean;
  sortOrder: number;
}

export type SponsorDocument = keystone.Document<Sponsor>;

const Sponsor = new keystone.List<Sponsor>('Sponsor', {
  autokey: { from: 'name', path: 'key', unique: true },
  map: { name: 'name' },
  sortable: true,
  sortContext: 'SponsorCategory:sponsors',
});

Sponsor.add({
  name: { type: String, required: true },
  logo: { type: Types.CloudinaryImage, autoCleanup: true },
  description: { type: Types.Markdown },
  url: { type: Types.Url },
  imageAdjust: {
    width: { type: String, label: 'Width (px, %, em,rem)' },
    height: { type: String, label: 'Height (px, %, em,rem)' },
  },
  // related to edition
  edition: { type: Types.Relationship, ref: 'Edition', many: true },
  // and to a sponsor category
  category: { type: Types.Relationship, ref: 'SponsorCategory' },
  // show previous sponsors
  showInPrevious: { type: Boolean, label: 'Show in previous partner list' },
  sortOrder: Number,
});

// handle users being silly and not adding a http to the document
Sponsor.schema.pre('save', function(this: SponsorDocument, done: () => void) {
  if (this.url && !this.url.startsWith('http')) {
    this.url = 'http://' + this.url;
  }
  done();
});

Sponsor.defaultColumns = 'name, category, edition';
Sponsor.register();

export default Sponsor;

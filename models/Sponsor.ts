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
}

const Sponsor = new keystone.List<Sponsor>('Sponsor', {
  autokey: { from: 'name', path: 'key', unique: true },
  map: {name: 'name'},
  sortable: true,
  sortContext: 'Edition:sponsors',
});


Sponsor.add({
  name: {type: String, required: true},
  logo: {type: Types.CloudinaryImage, autoCleanup: true},
  description: {type: Types.Html, wysiwyg: true},
  url: {type: Types.Url},
  imageAdjust: {
    width: {type: String, label: 'Width (px, %, em,rem)'},
    height: {type: String, label: 'Height (px, %, em,rem)'},
  },
  // related to edition
  edition: {type: Types.Relationship, ref: 'Edition'},
  // and to a sponsor category
  category: {type: Types.Relationship, ref: 'SponsorCategory'},
});

Sponsor.defaultColumns = 'name, category, edition';
Sponsor.register();

export default Sponsor;

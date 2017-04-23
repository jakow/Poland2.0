import * as keystone from 'keystone';
const Types = keystone.Field.Types;

const Sponsor = new keystone.List('Sponsor', {
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

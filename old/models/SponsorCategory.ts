import * as keystone from 'keystone';
const Types = keystone.Field.Types;

/**
 * SponsorCategory Model
 * ==================
 */
export interface SponsorCategory {
  name: string;
  singular: string;
  perColumn: number;
  showName: boolean;
  sortOrder: number;
  imageAdjust: {
    maxHeight: string;
    maxWidth: string;
  };
  edition: keystone.Schema.Relationship;
}

const SponsorCategory = new keystone.List<SponsorCategory>('SponsorCategory', {
  autokey: { from: 'name', path: 'key', unique: true },
  sortable: true,
  defaultSort: '-sortOrder',
  sortContext: 'Edition:sponsor-categories',
});

SponsorCategory.add({
  name: { type: String, required: true },
  singular: {type: String},
  perColumn: {type: Number, label: 'Sponsor logos per column'},
  showName: {type: Boolean, label: 'Show sponsor category name in sponsor list', default: true},
  sortOrder: {type: Number, label: 'Sort order (higher is more important)'},
  imageAdjust: {
    height: {type: String, label: 'Max height (px, em, rem, %)'},
    width: {type: String, label: 'Max width (px, em, rem, %)'},
  },
  edition: {type: Types.Relationship, ref: 'Edition', many: true},
});

SponsorCategory.relationship({  path: 'sponsors', ref: 'Sponsor', refPath: 'category'});
SponsorCategory.register();

export default SponsorCategory;

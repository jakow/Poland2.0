var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * SpeakerCategory Model
 * ==================
 */

var SpeakerCategory = new keystone.List('SpeakerCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	sortable: true,
	sortContext: 'Edition:sponsor-categories'
});

SpeakerCategory.add({
	name: { type: String, required: true },
	singular: {type: String},
	perColumn: {type: Number, label: "Speaker cards per column"},
	maxWidth: {type: Number, label: "Maximum card width (px, em, rem)"},
	edition: {type: Types.Relationship, ref: "Edition", many: true}
});


// SpeakerCategory.relationship({  path: 'sponsor-categories', ref: 'Sponsor', refPath: "category"});

// SpeakerCategory.register();

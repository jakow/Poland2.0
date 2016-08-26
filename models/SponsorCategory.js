var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * SponsorCategory Model
 * ==================
 */

var SponsorCategory = new keystone.List('SponsorCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	sortable: true,
	sortContext: 'Edition:sponsor-categories'
});

SponsorCategory.add({
	name: { type: String, required: true },
	perColumn: {type: Number, label: "Sponsor logos per column"},
	showName: {type: Boolean, label: "Show sponsor category name in sponsor list. For example 'Strategic' sponsor category dislays as 'Strategic Partners'", default: true},
	edition: {type: Types.Relationship, ref: "Edition", many: true}
});

SponsorCategory.relationship({  path: 'sponsor-categories', ref: 'Sponsor', refPath: "category"});

SponsorCategory.register();

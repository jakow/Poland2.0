var keystone = require('keystone');
var Types = keystone.Field.Types;



var Sponsor = new keystone.List('Sponsor', {
	autokey: { from: 'name', path: 'key', unique: true },
	// map: {name: 'name'},
	sortable: true,
	defaultSort: 'name',
	sortContext: 'Edition:sponsors'
});


Sponsor.add({
	name: {type: String, required: true},
	singular: {type: String},
	logo: {type: Types.CloudinaryImage, autoCleanup: true},
	description: {type: Types.Html, wysiwyg: true},
	url: {type: Types.Url},
	//related to edition
	edition: {type: Types.Relationship, ref: 'Edition'},
	//and to a sponsor category
	category: {type: Types.Relationship, ref: 'SponsorCategory'}
});

Sponsor.defaultColumns = 'name, category, edition';
Sponsor.register();
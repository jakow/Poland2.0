var keystone = require('keystone');
var Types = keystone.Field.Types;

var SponsorTypes = keystone.get('sponsor types');
console.log('Sponsor types: ', SponsorTypes);
var Sponsor = new keystone.List('Sponsor', {
	autokey: { from: 'name', path: 'key', unique: true },
	sortable: true,
	sortContext: 'Edition:sponsors'
});


Sponsor.add({
	name: {type: String, required: true},
	logo: {type: Types.CloudinaryImage, autoCleanup: true},
	sponsorType: {type: Types.Select, options: SponsorTypes.join(', '), default: SponsorTypes[SponsorTypes.length-1]},
	description: {type: Types.Html, wysiwyg: true},
	order: {type: Number},
	url: {type: Types.Url},
	//related to edition
	edition: {type: Types.Relationship, ref: 'Edition'}
});

Sponsor.defaultColumns = 'name, order, edition';
Sponsor.register();
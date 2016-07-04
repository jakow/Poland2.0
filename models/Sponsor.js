var keystone = require('keystone');
var Types = keystone.Field.Types;


var Sponsor = new keystone.List('Sponsor', {
	autokey: { from: 'name', path: 'key', unique: true }
});


Sponsor.add({
	name: {type: String, required: true},
	logo: {type: Types.CloudinaryImage, autoCleanup: true},
	
	description: {type: Types.Html, wysiwyg: true},
	order: {type: Number},
	url: {type: Types.Url},
	//related to edition
	edition: {type: Types.Relationship, ref: 'Edition'}
});

Sponsor.defaultColumns = 'name, order, edition';
Sponsor.register();
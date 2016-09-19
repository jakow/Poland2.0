var keystone = require('keystone');
var Types = keystone.Field.Types;

var TeamMember = new keystone.List('TeamMember', {
		map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	editable: true,
	sortable: true,
	sortContext: 'Edition:team-members'
});

TeamMember.add({
	name: {type: String, required: true, initial: true},
	position: {type: String},
	occupation: {type: String},
	photo: {type: Types.CloudinaryImage, width: 400, height: 400},
	description: {type: Types.Html, wysiwyg: true},
	email: {type: Types.Email},
	linkedin: {type: Types.Url},
	//related to edition
	edition: {type: Types.Relationship, ref: 'Edition'}
});

TeamMember.defaultColumns = 'name, position, edition';
TeamMember.register();



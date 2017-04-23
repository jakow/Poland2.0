const keystone = require('keystone');
const Types = keystone.Field.Types;

const StaticPage = new keystone.List('StaticPage', {
	map: { name: 'name' },
	autokey: { from: 'name', path: 'slug', unique: true },
	defaultSort: '-name'
});

StaticPage.add({
	name: {type: String, required: true, initial: true},
	route: {type: String},
	active: Boolean,
	showInMenu: Boolean,
	menuOrder: {type: Number, dependsOn: {showInMenu: true}, default: 0},
	content: {type: Types.Html, wysiwyg: false}
});

StaticPage.register();
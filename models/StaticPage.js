var keystone = require('keystone');
var Types = keystone.Field.Types;

var StaticPage = new keystone.List('StaticPage', {
	map: { name: 'name' },
	autokey: { from: 'name', path: 'slug', unique: true },
	defaultSort: '-name'
});

StaticPage.add({
	name: {type: String, required: true, initial: true},
	route: {type: String},
	active: Boolean,
	showInMenu: Boolean,
	content: {type: Types.Html, wysiwyg: false}
})

StaticPage.register();
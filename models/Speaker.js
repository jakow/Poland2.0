const keystone = require('keystone');
const Types = keystone.Field.Types;

const Speaker = new keystone.List('Speaker', {
	autokey: { path: 'slug', from: 'name', unique: true },
	map: { name: 'name' },
	sortable: true,
	editable: true,
	sortContext: 'Edition:speakers'

});

Speaker.add({
	name: {type: String, required: true},
	position: {type: String},
	company: {type: String},
	photo: {type: Types.CloudinaryImage, autoCleanup: true },
	publishedState: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true }, //should I use this?
	speakerType: {type: Types.Select, options: 'keynote, regular'},
	description: {type: Types.Html, wysiwyg: true, height: 150},
	presentation: {type: String, label: 'Presentation topic'},
	edition: {type: Types.Relationship, ref: 'Edition'}
});



Speaker.defaultColumns = 'name, speakerType, edition';
Speaker.register();

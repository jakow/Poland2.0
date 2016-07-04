var keystone = require('keystone');
var Types = keystone.Field.Types;

var Speaker = new keystone.List('Speaker', {
	sortable: true,
	sortContext: 'Edition:speakers',
	defaultSort: 'name',
	autokey: { path: 'slug', from: 'name', unique: true }
});

Speaker.add({
	name: {type: String, required: true},
	position: {type: String},
	photo: {type: Types.CloudinaryImage, autoCleanup: true },
	publishedState: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true }, //should I use this?
	speakerType: {type: Types.Select, options: 'keynote, regular'},
	description: {type: Types.Html, wysiwyg: true, height: 150},
	presentation: {type: String, label: 'Presentation topic'},
	edition: {type: Types.Relationship, ref: 'Edition'}
});


Speaker.schema.methods.orderGiven = function() {
	console.log(this.order);
	return typeof(this.order) === "number";
}

// Speaker.schema.pre('save', function(next) {
// 	this.orderGiven() ? console.log('Order given') : console.log('Order NOT given');
// 	if (!this.orderGiven()) {
// 		this.order = 100;
// 	}
// 	next();
// });


Speaker.defaultColumns = 'name, speakerType, edition';
Speaker.defaultSort = 'edition';
Speaker.register();

const keystone = require('keystone');
const _ = require('underscore');
const Types = keystone.Field.Types;
const moment = require('moment');

var Edition = new keystone.List('Edition', {
	map: { name: 'name' },
	autokey: { from: 'year', path: 'slug', unique: true },
	defaultSort: '-year',
	editable: true
});

Edition.add({
	year: {type: Number, required: true, initial: true, format: '0', initial: function() { var today = new Date(); return today.getFullYear();}},
	name: {type: String, required: true, initial: true},
	current: {type: Boolean, initial: true},
	description: {type: Types.Html, wysiwyg: true},
	venue: {
		name: { type: String },
		location:{type: Types.Location} //google maps coords
	},
	date: {
		start: {type: Date, label: 'Start date (required)'},
		end: {type: Date, label: 'End date (optional)'}, //TODO: validate that start is earlier than end
		provisional: {type: Boolean, label: 'Provisional date - only month will be shown on homepage. Fill start date only'}
	},
	mainPhoto: {type: Types.CloudinaryImage},
	photos: {type: Types.CloudinaryImages}
});


Edition.schema.virtual('dateString').get(function() {
	// NOTE the use of en dash instead of hyphen in dates
 let start = moment(this.date.start);
 let end = moment(this.date.end);
 if (this.date.provisional) {
	 // only the month and date printed
	 return start.format('MMMM YYYY');
 } else if (end.month() == start.month()) {
	 // only day of the month range printed
	 return `${start.date()}–${end.format('D MMMM YYYY')}`
 } else {
	 // contracted months are printed
	 return `${start.format('D MMM')}–${end.format('D MMM YYYY')}`;
 }


});


//get
Edition.schema.methods.getRefs = function(ref, filters = {}) {
	if ( !(typeof ref === 'string') )
		throw new Error('[Edition schema] Ref must be a string');
 	return keystone.list(ref).model.find(_.extend({edition: this.id}), filters);
};



Edition.relationship({path: 'speakers', ref: 'Speaker', refPath: 'edition'});
Edition.relationship({path: 'team-members', ref: 'TeamMember', refPath: 'edition'});
Edition.relationship({path: 'sponsors', ref: 'Sponsor', refPath: 'edition'});
Edition.relationship({path: 'sponsor-categories', ref: 'SponsorCategory', refPath: 'edition'});
Edition.relationship({path: 'agenda-days', ref: 'AgendaDay', refPath: 'edition'});
Edition.defaultColumns = 'name, year, current';
Edition.register();

module.exports = Edition;

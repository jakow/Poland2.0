var keystone = require('keystone');
var _ = require('underscore');
var Types = keystone.Field.Types;

var Edition = new keystone.List('Edition', {
	map: { name: 'year' },
	autokey: { from: 'year', path: 'slug', unique: true },
	defaultSort: '-year'
});

Edition.add({
	year: {type: Number, required: true, format: '0', initial: function() { var today = new Date(); return today.getFullYear();}},
	fullName: {type: String},
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



Edition.schema.virtual('date.dateString').get(function() {
	//this should not sit so low level...
	var months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	var start = this.date.start;
	var end = this.date.end;
	var startDate = null, 
		endDate = null, 
		startMonth = null, 
		endMonth = null, 
		startYear = null, 
		endYear = null;
	
	if (start) {
		startDate = start.getDate();
		startMonth = months[start.getMonth()];
		startYear = start.getYear() + 1900; //js being js
	}

	if (end) {
		endDate = end.getDate();
		endMonth = months[end.getMonth()];
		endYear = end.getYear() + 1900;
	}

	if (this.date.provisional)
		return `${startMonth} ${startYear}`;

	if (start && end) {
		if(startMonth === endMonth)
			return `${startDate}-${endDate} ${endMonth} ${endYear}`;
		else
			return `${startDate} ${startMonth} - ${endDate} ${endMonth} ${endYear}`;
	}
	else if (start)
		return `${startDate} ${startMonth} ${startYear}`;
	else
		return '';
});


//get 
Edition.schema.methods.getRefs = function(ref, filters) {
	if ( !(typeof ref === 'string') )
		throw new Error('[Edition schema] Ref must be a string');
	if ( !(typeof filters === 'object') )
		filters = {};
 	return keystone.list(ref).model.find(_.extend({edition: this.id}), filters);
};


Edition.relationship({path: 'speakers', ref: 'Speaker', refPath: 'edition'});
Edition.relationship({path: 'team-members', ref: 'TeamMember', refPath: 'edition'});
Edition.relationship({path: 'sponsors', ref: 'Sponsor', refPath: 'edition'});
Edition.relationship({path: 'sponsor-categories', ref: 'SponsorCategory', refPath: 'edition'});
Edition.defaultColumns = 'current';
Edition.register();

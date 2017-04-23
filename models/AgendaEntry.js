const keystone = require('keystone');
const Types = keystone.Field.Types;

const AgendaEntry = new keystone.List('AgendaEntry', {
	map: { name: 'name' },
	autokey: { from: 'year', path: 'slug', unique: true },
	defaultSort: 'date'
});

function timeValidate(message = 'Invalid time entered') {
		return {
			message,
			validator: (v) => /[0-9]{1,2}:[0-9]{2}\s?(am|pm)?/.test(v)
		}
}

AgendaEntry.add({
  name: {type: String, required: true},
  description: {type: String},
  image: {type: Types.CloudinaryImage},
  time: {
		start: {type: String, validate: timeValidate('Invalid start time')},
		end: {type: String, validate: timeValidate('Invalid end time')},
	},
	speakers: {type: Types.Relationship, ref: 'Speaker', many: true},
	agendaDay: {type: Types.Relationship, ref: 'AgendaDay'},
	venue: {type: Types.Relationship, ref: 'Venue'}
});

AgendaEntry.defaultColumns = 'name, time.start, time.end';
AgendaEntry.register();


module.exports = AgendaEntry;

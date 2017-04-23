const keystone = require('keystone');
const Types = keystone.Field.Types;

const AgendaDay = new keystone.List('AgendaDay', {
	// map: { name: 'name' },
	autokey: { from: 'name', path: 'slug', unique: true },
	defaultSort: 'date'
});


AgendaDay.add({
  name: {type: String, required: true, initial: true},
  date: {type: Types.Datetime, default: Date.now()},
  description: {type: String},
  image: {type: Types.CloudinaryImage},
  edition: {type: Types.Relationship, ref: 'Edition'},
  venue: {type: Types.Relationship, ref: 'Venue'}
});

AgendaDay.relationship({path: 'agenda-entries', ref: 'AgendaEntry', refPath: 'agendaDay'});

AgendaDay.register();

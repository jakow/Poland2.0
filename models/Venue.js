const keystone = require('keystone');
const Types = keystone.Field.Types;

const Venue = new keystone.List('Venue', {
  map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true }
});


Venue.add({
  name: {type: String, required: true, initial: true},
  image: {type: Types.CloudinaryImage},
  location: {type: Types.Location}
});

// Events in this venue
Venue.relationship({path: 'agenda-entries', ref: 'AgendaEntry', refPath: 'agendaDay'});

Venue.defaultColumns = 'name, location';

Venue.register();
import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
const Types = keystone.Field.Types;

interface VenueDocument extends mongoose.Document {
  name: string;
  image: keystone.Schema.CloudinaryImage;
  location: keystone.Schema.Location;
}

const Venue = new keystone.List('Venue', {
  map: { name: 'name' },
  autokey: {path: 'slug', from: 'name', unique: true},
});


Venue.add({
  name: {type: String, required: true, initial: true},
  image: {type: Types.CloudinaryImage},
  location: {type: Types.Location},
});

// Events in this venue
Venue.relationship({path: 'agenda-entries', ref: 'AgendaEntry', refPath: 'agendaDay'});

Venue.defaultColumns = 'name, location';

Venue.register();

export default Venue;

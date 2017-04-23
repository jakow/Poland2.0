import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
const Types = keystone.Field.Types;

interface AgendaDayDocument extends mongoose.Document {
  date: Date;
  description: string;
  edition: keystone.Schema.Relationship;
  image: keystone.Schema.CloudinaryImage;
}

const AgendaDay = new keystone.List<AgendaDayDocument>('AgendaDay', {
	// map: { name: 'name' },
  autokey: { from: 'name', path: 'slug', unique: true },
  defaultSort: 'date',
});

AgendaDay.add({
  date: {type: Types.Datetime, default: Date.now()},
  description: {type: String},
  edition: {type: Types.Relationship, ref: 'Edition'},
  image: {type: Types.CloudinaryImage},
  name: {type: String, required: true, initial: true},
  venue: {type: Types.Relationship, ref: 'Venue'},
});

AgendaDay.relationship({path: 'agenda-entries', ref: 'AgendaEntry', refPath: 'agendaDay'});


AgendaDay.register();

export default AgendaDay;

import * as keystone from 'keystone';
import mongoose from 'mongoose';
const Types = keystone.Field.Types;
function timeValidate(message = 'Invalid time entered') {
  return {
    message,
    validator: (v: string) => /[0-9]{1,2}:[0-9]{2}\s*(am|pm)?/.test(v),
  };
}

interface AgendaEntryDocument extends mongoose.Document {
  name: string;
  description: string;
  image: keystone.Schema.CloudinaryImage;
  time: {
    start: string;
    end: string;
  };
  speakers: keystone.Schema.Relationship;
  agendaDay: keystone.Schema.Relationship;
  venue: keystone.Schema.Relationship;
}

const AgendaEntry = new keystone.List<AgendaEntryDocument>('AgendaEntry', {
  map: { name: 'name' },
  autokey: { from: 'year', path: 'slug', unique: true },
  defaultSort: 'time.start',
});


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
  venue: {type: Types.Relationship, ref: 'Venue'},
});

AgendaEntry.defaultColumns = 'name, time.start, time.end';
AgendaEntry.register();

export default AgendaEntry;

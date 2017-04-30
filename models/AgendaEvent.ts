import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
const Types = keystone.Field.Types;

function timeValidate(message = 'Invalid time entered') {
  return {
    message,
    validator: (v: string) => /[0-9]{1,2}:[0-9]{2}\s*(am|pm)?/.test(v),
  };
}

export interface AgendaEvent {
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

export type AgendaEventDocument = keystone.ModelDocument<AgendaEvent>;

const AgendaEvent = new keystone.List<AgendaEvent>('AgendaEvent', {
  map: { name: 'name' },
  autokey: { from: 'year', path: 'slug', unique: true },
  defaultSort: 'time.start',
});

AgendaEvent.add({
  name: {type: String, required: true},
  description: {type: Types.Textarea},
  image: {type: Types.CloudinaryImage},
  time: {
    start: {type: String, validate: timeValidate('Invalid start time')},
    end: {type: String, validate: timeValidate('Invalid end time')},
  },
  speakers: {type: Types.Relationship, ref: 'Speaker', many: true},
  agendaDay: {type: Types.Relationship, ref: 'AgendaDay'},
  venue: {type: Types.Relationship, ref: 'Venue'},
});

AgendaEvent.defaultColumns = 'name, time.start, time.end';
AgendaEvent.register();

export default AgendaEvent;

import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
import {AgendaDay} from './AgendaDay';
const Types = keystone.Field.Types;

function timeValidate(message = 'Invalid time entered') {
  return {
    message,
    validator: (v: string) => /[0-9]{1,2}:[0-9]{2}\s*(am|pm)?/.test(v),
  };
}

export interface AgendaEvent {
  name: string;
  type: string;
  description: string;
  image: keystone.Schema.CloudinaryImage;
  time: {
    start: string;
    end: string;
  };
  speakers: keystone.Schema.Relationship;
  agendaDay: keystone.Schema.Relationship;
  venue: keystone.Schema.Relationship;
  edition: keystone.Schema.Relationship;
}

export type AgendaEventDocument = keystone.Document<AgendaEvent>;

const AgendaEvent = new keystone.List<AgendaEvent>('AgendaEvent', {
  map: { name: 'name' },
  autokey: { from: 'name', path: 'slug', unique: true },
  defaultSort: 'time.start',
});

AgendaEvent.add({
  name: {type: String, required: true},
  type: String,
  description: {type: Types.Textarea},
  image: {type: Types.CloudinaryImage},
  time: {
    start: {type: Date, utc: true, label: 'Start time'},
    end: {type: Date, utc: true, label: 'End time'},
  },
  speakers: {type: Types.Relationship, ref: 'Speaker', many: true},
  agendaDay: {type: Types.Relationship, ref: 'AgendaDay'},
  venue: {type: Types.Relationship, ref: 'Venue'},
  edition: {type: Types.Relationship, hidden: true, ref: 'Edition'},
});

// assign the same edition to agenda event as to the agenda day it belongs to
AgendaEvent.schema.pre('save', async function(done) { // tslint:disable-line
 const doc = this as AgendaEventDocument;
 if (doc.agendaDay) {
    try {
      const day = await keystone.list<AgendaDay>('AgendaDay').model.findById(doc.agendaDay).exec();
      doc.edition = day.edition;
      done();
    } catch (e) {
      done(e);
    }
 } else {
   done();
 }

});

AgendaEvent.defaultColumns = 'name, time.start, time.end';
AgendaEvent.register();

export default AgendaEvent;

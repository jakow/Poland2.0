import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
const Types = keystone.Field.Types;
import {AgendaEvent} from './AgendaEvent';

export interface AgendaDay {
  name: string;
  date: Date;
  description: string;
  venue: keystone.Schema.Relationship;
  edition: keystone.Schema.Relationship;
  image: keystone.Schema.CloudinaryImage;
  // the data that eventually is populated by reverse population
  events?: AgendaEvent[];
}


const AgendaDay = new keystone.List<AgendaDay>('AgendaDay', {
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

AgendaDay.relationship({path: 'agenda-events', ref: 'AgendaEvent', refPath: 'agendaDay'});

AgendaDay.register();

export default AgendaDay;

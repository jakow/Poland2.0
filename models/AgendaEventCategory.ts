import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
import { AgendaDay } from './AgendaDay';
const Types = keystone.Field.Types;

export interface AgendaEventCategory {
  name: string;
  color: string;
}

export type AgendaEventCategoryDocument = keystone.Document<AgendaEventCategory>;

const AgendaEventCategory = new keystone.List<AgendaEventCategory>('AgendaEventCategory', {
  map: { name: 'name' },
  autokey: { from: 'name', path: 'slug' },
});

AgendaEventCategory.add({
  name: { type: String, required: true },
  color: { type: Types.Color },
});

AgendaEventCategory.relationship({ path: 'agenda-events', ref: 'AgendaEvent', refPath: 'category' });

AgendaEventCategory.register();

export default AgendaEventCategory;

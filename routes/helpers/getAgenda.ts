import {AgendaEvent, AgendaEventDocument} from '../../models/AgendaEvent';
import {AgendaDay} from '../../models/AgendaDay';
import {EditionDocument, Edition} from '../../models/Edition';
import {list} from 'keystone';
import {groupBy} from 'lodash';

export interface Agenda {
  days: AgendaDay[];
  edition?: Edition;
}

export default async function getAgenda(edition?: string | EditionDocument): Promise<Agenda> {
  const filter = !!edition ? {edition} : {};
  const agendaDays = await list<AgendaDay>('AgendaDay').model.find(filter).exec();
  // Should sort by start time.
  const agendaEvents = await list<AgendaEvent>('AgendaEvent').model
    .find({agendaDay: {$in: agendaDays}})
    .sort({'time.start': -1})
    .populate('speakers')
    .populate('venue')
    .exec();
  // assume that lodash groupBy is 'stable', i.e. preserves sort order:
  const grouped = groupBy(agendaEvents, 'agendaDay');

  // convert e
  const days = agendaDays.map( (d) => d.toObject() as AgendaDay);
  days.forEach( (d) => {
    d.events = agendaEvents.map( (e) => e.toObject() as AgendaEvent);
  });
  const agenda: Agenda = {
    days,
    // also may choose to maintain a reference to the edition
    // the below spread check makes sure that `edition` is an Edition document, not an ObjectId
    // and attaches the edition object to the agenda. Not sure if needed later on but oh well.
    ...(typeof edition === 'object' && edition.hasOwnProperty('name')) && edition,
  };
  return agenda;
}

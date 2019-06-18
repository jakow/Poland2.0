import {AgendaEvent, AgendaEventDocument} from '../../models/AgendaEvent';
import {AgendaDay, AgendaDayDocument} from '../../models/AgendaDay';
import {EditionDocument, Edition} from '../../models/Edition';
import {list} from 'keystone';
import {groupBy} from 'lodash';

export interface Agenda {
  days: AgendaDay[];
  edition?: Edition;
}

export default async function getAgenda(edition?: EditionDocument): Promise<Agenda> {
  // if agenda for given edition is required, then use current edition as model filter
  const filter = !!edition ? {edition} : {};
  const agendaDays = await list<AgendaDay>('AgendaDay').model
    .find(filter)
    .sort({date: 'ascending'}).exec();
  // Should sort by start time.
  const agendaEvents = await list<AgendaEvent>('AgendaEvent').model
    .find({agendaDay: {$in: agendaDays}})
    .sort({'time.start': 'ascending'})
    .populate('speakers venue category')
    .exec();

  const days = agendaDays.map( (d) => d.toObject() as AgendaDayDocument);
  days.forEach((day) => {
    day.events = agendaEvents
      .map((ev) => ev.toObject() as AgendaEvent)
      .filter((ev) => ev.agendaDay.toString() === day._id.toString());
      // .sort( (a, b) => Number(a.time.start) - Number(b.time.start));
  });
  const agenda: Agenda = {
    days,
    // also may choose to maintain a reference to the edition
    // the below spread check makes sure that `edition` is an Edition document, not an ObjectId
    // and attaches the edition object to the agenda. Not sure if needed later on but oh well.
    edition,
  };
  return agenda;
}

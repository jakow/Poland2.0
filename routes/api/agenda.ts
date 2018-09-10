import { list } from 'keystone';
import { Router } from 'express';
import { keyBy } from 'lodash';
import { AgendaEvent } from '../../models/AgendaEvent';
import { AgendaEventCategory } from '../../models/AgendaEventCategory';
import { AgendaDay } from '../../models/AgendaDay';
import { Edition } from '../../models/Edition';
import { Venue } from '../../models/Venue';
import reversePopulate from '../helpers/reversePopulate';

export const agenda = Router();

/**
 * Get all events for this edition
 */
agenda.get('/', async (req, res, next) => {
  const currentEdition = await list<Edition>('Edition').model.findOne({ current: true }).exec();
  if (!currentEdition) {
    return res.json([]);
  }

  const [days, events, categories, venues] = await Promise.all([
    list<AgendaDay>('AgendaDay').model.find({ edition: currentEdition }).exec(),
    list<AgendaEvent>('AgendaEvent').model.find({ edition: currentEdition }).exec(),
    list<AgendaEventCategory>('AgendaEventCategory').model.find().exec(),
    list<Venue>('Venue').model.find().exec(),
  ]);

  res.json({
    agenda: reversePopulate(days, 'events', events, 'agendaDay'),
    categories: keyBy(categories, '_id'),
    venues: keyBy(venues, '_id'),
  });
});

import {list} from 'keystone';
import {Router} from 'express';
import {AgendaEvent} from '../../models/AgendaEvent';
import {Edition} from '../../models/Edition';

export const events = Router();

/**
 * Get all events for this edition
 */
events.get('/', async (req, res, next) => {
  const currentEdition = await list<Edition>('Edition').model.findOne({current: true}).exec();
  if (!currentEdition) {
    return res.json([]);
  }
  const eventList = await list<AgendaEvent>('AgendaEvent').model
  .find({edition: currentEdition})
  .populate('venue')
  .exec();
  res.json(eventList.map((e) => e.toJSON()));
});

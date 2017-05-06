import {RequestHandler} from 'express';
import {View} from 'keystone';

import {EditionDocument} from '../../models/Edition';
import {SpeakerCategory} from '../../models/SpeakerCategory';
import resolveView from '../helpers/resolveView';
import getSpeakersByCategory from '../helpers/getSpeakersByCategory';
import getAgenda from '../helpers/getAgenda';

export const home: RequestHandler = async (req, res, next) => {
  res.locals.route = 'home';
  const view = new View(req, res);
  const currentEdition = res.locals.currentEdition as EditionDocument;
  res.locals.speakerCategories = await getSpeakersByCategory(currentEdition._id);
  res.locals.agenda = await getAgenda(currentEdition._id);
  view.render(resolveView('home'));
};

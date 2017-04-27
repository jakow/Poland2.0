import * as express from 'express';
import * as keystone from 'keystone';

import {EditionDocument} from '../../models/Edition';
import {SpeakerCategory} from '../../models/SpeakerCategory';
import resolveView from '../helpers/resolveView';
import getSpeakersByCategory from '../helpers/getSpeakersByCategory';



export const home: express.RequestHandler = async (req, res, next) => {
  const view = new keystone.View(req, res);
  const currentEdition = res.locals.currentEdition as EditionDocument;

  res.locals.speakerCategories = await getSpeakersByCategory(currentEdition._id);
  res.locals.agenda = null; // TODO
  view.render(resolveView('home'));
};

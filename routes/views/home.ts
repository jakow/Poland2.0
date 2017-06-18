import {RequestHandler} from 'express';
import {View, list} from 'keystone';

import {EditionDocument} from '../../models/Edition';
import {SpeakerCategory} from '../../models/SpeakerCategory';
import {Speaker} from '../../models/Speaker';
import resolveView from '../helpers/resolveView';
import reversePopulate from '../helpers/reversePopulate';
import getAgenda from '../helpers/getAgenda';

export const home: RequestHandler = async (req, res, next) => {
  res.locals.route = 'home';
  const view = new View(req, res);
  const currentEdition = res.locals.currentEdition as EditionDocument;
  if (currentEdition != null) {
    let speakers;
    let speakerCategories;
    try {
      speakers = await list<Speaker>('Speaker')
        .model.find({edition: currentEdition, speakerCategory: { $ne: null }}).exec();
      // store a handle to all speakers as well
      res.locals.speakers = speakers;
      speakerCategories = await list<SpeakerCategory>('SpeakerCategory')
        .model.find({edition: currentEdition}).exec();
    } catch (e) {
      next(e);
    }
    const speakersByCategory = reversePopulate(speakerCategories, 'speakers', speakers, 'speakerCategory');
    res.locals.speakerCategories = speakersByCategory;
    res.locals.agenda = await getAgenda(currentEdition);
  }
  view.render(resolveView('home'));
};

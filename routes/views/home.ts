import {RequestHandler} from 'express';
import { EditionDocument } from '../../models/Edition';
import { ContentControl } from '../../models/ContentControl';
import { Sponsor } from '../../models/Sponsor';
import { SponsorCategory } from '../../models/SponsorCategory';
import {View, list, get} from 'keystone';
import resolveView from '../helpers/resolveView';
import getAgenda from '../helpers/getAgenda';
import getSpeakersByCategory from '../helpers/getSpeakersByCategory';
import getSponsorsByCategory from '../helpers/getSponsorsByCategory';
import {canonicalUrl} from '../../config';
import {Opengraph, TwitterCard, twitterUsername} from '../helpers/seo';
import {sortBy} from 'lodash';
import * as moment from 'moment';

export const home: RequestHandler = async (req, res, next) => {
  res.locals.route = 'home';
  const view = new View(req, res);
  const currentEdition = res.locals.currentEdition as EditionDocument;
  const contentControl = res.locals.contentControl as ContentControl;

  if (currentEdition != null) {
    const [speakerCategories, agenda] = await Promise.all([
      await getSpeakersByCategory(currentEdition),
      await getAgenda(currentEdition),
    ]);
    res.locals.speakerCategories = speakerCategories;
    res.locals.agenda = agenda;
  }

  if (currentEdition != null && contentControl.showSponsors) {
    const sponsorCategories = await getSponsorsByCategory(currentEdition);
    res.locals.sponsorCategories = sponsorCategories;
  } else if (contentControl.showPreviousSponsors) {
    let previousSponsors = await list<Sponsor>('Sponsor').model
      .find({showInPrevious: true}).populate('category').exec();
    // we're first sorting by sort order, then by category importance
    // TODO: keystone sort is F***ED
    previousSponsors = sortBy(previousSponsors, (s1) => -((s1.category as any) as SponsorCategory).sortOrder);
    res.locals.previousSponsors = previousSponsors;
  }

  let title: string;
  if (currentEdition != null) {
    title = get('brand');
  } else if (!currentEdition.caption) {
    title = currentEdition.name;
  } else {
    title = `${currentEdition.name} — ${currentEdition.caption}`;
  }
  res.locals.title = title;

  // set opengraph
  const description = currentEdition ? currentEdition.caption : '';
  const opengraph: Opengraph = {
    title,
    description,
    url: canonicalUrl,
    image: contentControl.opengraphImage,
  };
  res.locals.opengraph = opengraph;

  const twitterCard: TwitterCard = {
    title,
    description,
    site: twitterUsername(contentControl.twitterUrl),
    image: contentControl.opengraphImage,
  };
  res.locals.twitterCard = twitterCard;

  view.render(resolveView('home'));
};

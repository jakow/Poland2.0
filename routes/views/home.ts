import {RequestHandler} from 'express';
import { EditionDocument } from '../../models/Edition';
import { ContentControl } from '../../models/ContentControl';
import { Sponsor } from '../../models/Sponsor';
import { Speaker } from '../../models/Speaker';
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
  // get agenda and speakers
  if (currentEdition != null) {
    const [speakerCategories, agenda] = await Promise.all([
      getSpeakersByCategory(currentEdition),
      getAgenda(currentEdition),
    ]);
    res.locals.speakerCategories = speakerCategories;
    res.locals.agenda = agenda;
    // also need flat speaker list for JSON-LD
    const speakers: Speaker[] = [];
    for (const c of speakerCategories) {
      speakers.push(...c.speakers);
    }
    res.locals.speakers = speakers;
  }

  // Decide which sponsors to show
  if (currentEdition != null && contentControl.showSponsors) {
    // current sponsor if there is an edition and allowed to show sponsors
    res.locals.sponsorCategories = await getSponsorsByCategory({edition: currentEdition});
  } else if (contentControl.showPreviousSponsors) {
    // or previous sponsors
    res.locals.previousSponsorCategories = await getSponsorsByCategory(null, {showInPrevious: true});
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
  const description = contentControl.opengraphDescription;
  const ogImage = contentControl.opengraphImage || '/static/images/opengraph.png';
  const twitterImage = contentControl.twitterImage || '/static/images/twitter-card.png';
  const opengraph: Opengraph = {
    title,
    description,
    image: ogImage,
    url: canonicalUrl,
  };
  res.locals.opengraph = opengraph;

  const twitterCard: TwitterCard = {
    title,
    description,
    image: twitterImage,
    imageAlt: get('brand') + ' logo',
    site: twitterUsername(contentControl.twitterUrl),

  };
  res.locals.twitterCard = twitterCard;

  view.render(resolveView('home'));
};

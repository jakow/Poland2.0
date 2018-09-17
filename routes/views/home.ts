import { RequestHandler } from 'express';
import { Edition } from '../../models/Edition';
import { ContentControl } from '../../models/ContentControl';
import { Speaker } from '../../models/Speaker';
import { list } from 'keystone';
import getAgenda from '../helpers/getAgenda';
import getSpeakersByCategory from '../helpers/getSpeakersByCategory';
import getSponsorsByCategory from '../helpers/getSponsorsByCategory';

export const home: RequestHandler = async (req, res, next) => {
  const contentControl = await list<ContentControl>('ContentControl').model.findOne().exec();
  const currentEdition = await list<Edition>('Edition').model.findOne({ current: true }).exec();

  let speakerCategories = {};
  let agenda = {};
  let speakers = {};

  // get agenda and speakers
  if (currentEdition != null) {
    const [_speakerCategories, _agenda] = await Promise.all([
      getSpeakersByCategory(currentEdition),
      getAgenda(currentEdition),
    ]);
    speakerCategories = _speakerCategories;
    agenda = _agenda;
    // also need flat speaker list for JSON-LD
    const _speakers: Speaker[] = [];
    for (const c of _speakerCategories) {
      _speakers.push(...c.speakers);
    }
    speakers = _speakers;
  }

  let sponsorCategories = {};
  let previousSponsorCategories = {};

  // Decide which sponsors to show
  if (currentEdition != null && contentControl.showSponsors) {
    // current sponsor if there is an edition and allowed to show sponsors
    sponsorCategories = await getSponsorsByCategory(
      { edition: currentEdition });
  } else if (contentControl.showPreviousSponsors) {
    // or previous sponsors
    previousSponsorCategories = await getSponsorsByCategory({ showInPrevious: true });
  }

  // let title: string;
  // if (currentEdition != null) {
  //   title = get('brand');
  // } else if (!currentEdition.caption) {
  //   title = currentEdition.name;
  // } else {
  //   title = `${currentEdition.name} — ${currentEdition.caption}`;
  // }
  // res.locals.title = title;

  // // set opengraph
  // const description = contentControl.opengraphDescription;
  // const ogImage = contentControl.opengraphImage || '/static/images/opengraph.png';
  // const twitterImage = contentControl.twitterImage || '/static/images/twitter-card.png';
  // const opengraph: Opengraph = {
  //   title,
  //   description,
  //   image: ogImage,
  //   url: canonicalUrl,
  // };
  // res.locals.opengraph = opengraph;

  // const twitterCard: TwitterCard = {
  //   title,
  //   description,
  //   image: twitterImage,
  //   imageAlt: get('brand') + ' logo',
  //   site: twitterUsername(contentControl.twitterUrl),

  // };
  // res.locals.twitterCard = twitterCard;

  res.json({
    speakerCategories,
    agenda,
    speakers,
    sponsorCategories,
    previousSponsorCategories
  });
};

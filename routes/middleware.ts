import { list } from 'keystone';
import { Request, Response, Router } from 'express';
import { ContentControl, Edition } from '../models';

const middleware = Router();

export interface NavItem {
  title: string; // display name
  url: string; // where it goes
  type?: 'link' | 'button';
}

export const getContentControl = async () =>
  list<ContentControl>('ContentControl').model.findOne().exec();

export const getCurrentEdition = async () =>
  list<Edition>('Edition').model.findOne({ current: true }).exec();

/**
 * Returns information used on all pages.
 * This includes enabled navigation items, content control and information regarding
 * current edition of Poland 2.0.
 */
middleware.get('/', async (req: Request, res: Response) => {
  const contentControl = await getContentControl();
  const currentEdition = await getCurrentEdition();

  const navLinks: NavItem[] = [
    ...contentControl.showSpeakers ? [{ title: 'Speakers', url: '/#speakers' }]
      : [],
    ...contentControl.showAgenda ? [{ title: 'Agenda', url: '/#agenda' }]
      : [],
    ...contentControl.showSponsors ? [{ title: 'Partners', url: '/#partners' }]
      : [],
    ...contentControl.showPreviousSponsors ?
      [{ title: 'Previous Partners', url: '/#previous-partners' }]
      : [],
    { title: 'About', url: '/about' },
    { title: 'empowerPL', url: '/empowerPL' },
    { title: 'Past Editions', url: '/past-editions' },
    ...contentControl.tickets.live && contentControl.tickets.url ?
      [<NavItem>{ title: 'Buy Tickets', url: contentControl.tickets.url, type: 'button' }]
      : []
  ];

  res.json({
    contentControl,
    navLinks,
    currentEdition: { // .toJSON({ virtuals: true }) doesn't work :(
      ...currentEdition.toObject(),
      dateString: currentEdition.dateString,
      isoString: currentEdition.isoString
    },
  });
});

export default middleware;

import { list } from 'keystone';
import { Edition } from '../models/Edition';
import { ContentControl } from '../models/ContentControl';
import { Request, Response, NextFunction, Router } from 'express';

const middleware = Router();

export interface NavItem {
  title: string; // display name
  url: string; // where it goes
  style?: 'link' | 'button';
}

/**
 * Returns information used on all pages.
 * This includes enabled navigation items, content control and information regarding
 * current edition of Poland 2.0.
 */
middleware.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const contentControl = await list<ContentControl>('ContentControl').model.findOne().exec();
  const currentEdition = await list<Edition>('Edition').model.findOne({ current: true }).exec();

  const navLinks: NavItem[] = [
    { title: 'About', url: '/about' },
    ...contentControl.showSpeakers ? [{ title: 'Speakers', url: '/#speakers' }]
      : [],
    ...contentControl.showAgenda ? [{ title: 'Agenda', url: '/#agenda' }]
      : [],
    ...contentControl.showSponsors ? [{ title: 'Partners', url: '/#partners' }]
      : [],
    ...contentControl.showPreviousSponsors ?
      [{ title: 'Previous Partners', url: '/#previous-partners' }]
      : [],
    { title: 'Past Editions', url: '/past-editions' },
    { title: 'empowerPL', url: '/empowerPL' },
    ...contentControl.tickets.live && contentControl.tickets.url ?
      [<NavItem>{ title: 'Buy Tickets', url: contentControl.tickets.url, style: 'button' }]
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

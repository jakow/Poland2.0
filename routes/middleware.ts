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
  // const staticPages = await list<StaticPage>('StaticPage').model
  //   .find({ active: true, showInMenu: true })
  //   .select({ name: true, route: true }).exec();

  const navLinks: NavItem[] = [
    { title: 'About', url: '/about' },
    // ...contentControl.showSpeakers ? [{ title: 'Speakers', url: '/#speakers' }]
    //   : [],
    // ...contentControl.showAgenda ? [{ title: 'Agenda', url: '/#agenda' }]
    //   : [],
    // ...contentControl.showSponsors ? [{ title: 'Partners', url: '/#partners' }]
    //   : [],
    { title: 'Past Editions', url: '/past-editions' },
    { title: 'empowerPL', url: '/empowerPL' },
    ...contentControl.tickets.live && contentControl.tickets.url ?
      [<NavItem>{ title: 'Tickets', url: contentControl.tickets.url, style: 'button' }]
      : []
  ];
  // const staticPageRoutes: NavItem[] = staticPages.map(p => ({
  //   title: p.name, url: p.route
  // }));

  res.json({
    contentControl,
    currentEdition,
    navLinks
  });
});

export default middleware;

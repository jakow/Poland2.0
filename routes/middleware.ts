import { list } from 'keystone';
import { Edition } from '../models/Edition';
import { ContentControl } from '../models/ContentControl';
import { StaticPage } from '../models/StaticPage';
import { Request, Response, NextFunction, Router } from 'express';

const middleware = Router();

middleware.get('/getCurrentEdition', async (req: Request, res: Response, next: NextFunction) => {
  const currentEdition = await list<Edition>('Edition').model.findOne({ current: true }).exec();
  res.json({ currentEdition });
});

middleware.get('/getContentControl', async (req: Request, res: Response, next: NextFunction) => {
  const contentControl = await list('ContentControl').model.findOne().exec();
  res.json({ contentControl });
});

export interface NavItem {
  title: string; // display name
  url: string; // where it goes
  style?: 'link' | 'button';
}

/**
 * Initialises the standard view locals
 * The included layout depends on the navLinks array to generate
 * the navigation in the header, you may wish to change this array
 * or replace it with your own templates / logic.
 */
middleware.get('/getNavLinks', async (req: Request, res: Response, next: NextFunction) => {
  const contentControl = await list<ContentControl>('ContentControl').model.findOne().exec();
  const staticPages = await list<StaticPage>('StaticPage').model
    .find({ active: true, showInMenu: true })
    .select({ name: true, route: true }).exec();

  const nav: NavItem[] = [
    { title: 'About', url: '/about' },
    ...contentControl.showSpeakers ? [{ title: 'Speakers', url: '/#speakers' }]
      : [],
    ...contentControl.showAgenda ? [{ title: 'Agenda', url: '/#agenda' }]
      : [],
    ...contentControl.showSponsors ? [{ title: 'Partners', url: '/#partners' }]
      : [],
    { title: 'Past Editions', url: '/past-editions' },
    { title: 'empowerPL', url: '/empowerPL' },
  ];
  const staticPageRoutes: NavItem[] = staticPages.map(p => ({
    title: p.name, url: p.route
  }));
  res.json({
    navLinks: [...nav, ...staticPageRoutes]
  });
});

// export function requireUser(req: Request, res: Response, next: NextFunction) {
//   if (req.user) {
//     res.redirect('/keystone/signin');
//   } else {
//     next();
//   }
// }

// export async function getStaticPage(req: Request, res: Response, next: NextFunction) {
//   next();
// }

export default middleware;

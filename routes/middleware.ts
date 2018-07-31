import {list} from 'keystone';
import {Edition} from '../models/Edition';
import {ContentControl} from '../models/ContentControl';
import {StaticPage} from '../models/StaticPage';
import {RequestHandler, Request, Response, NextFunction} from 'express';
// import {environment} from '../config';
// import reversePopulate from './helpers/reversePopulate';
import resolveView from './helpers/resolveView';

export async function getCurrentEdition(req: Request, res: Response, next: NextFunction) {
  try {
    const currentEdition = await list<Edition>('Edition').model.findOne({current: true}).exec();
    res.locals.currentEdition = currentEdition;
    next();
  } catch (e) {
    next(e);
  }
}

export async function getContentControl(req: Request, res: Response, next: NextFunction) {
  try {
    const contentControl = await list('ContentControl').model.findOne().exec();
    res.locals.contentControl = contentControl;
    next();
  } catch (e) {
    next(e);
  }
}

interface NavItem {
  name: string; // display name
  route: string; // where it goes
  key: string; // what is the route key
}

/**
 * Initialises the standard view locals
 * The included layout depends on the navLinks array to generate
 * the navigation in the header, you may wish to change this array
 * or replace it with your own templates / logic.
 */
export async function initLocals(req: Request, res: Response, next: NextFunction) {
  const contentControl = res.locals.contentControl as ContentControl;
  const staticPages = await list<StaticPage>('StaticPage').model
    .find({active: true, showInMenu: true})
    .select({name: true, route: true}).exec();

  const nav: NavItem[] = [
    {name: 'About', route: '/about', key: 'about'},
    ...contentControl.showSpeakers ? [{name: 'Speakers', route: '/#speakers', key: 'speakers'}] : [],
    ...contentControl.showAgenda ? [{name: 'Agenda', route: '/#agenda', key: 'speakers'}] : [],
    ...contentControl.showSponsors ? [{name: 'Partners', route: '/#partners', key: 'partners'}] : [],
    {name: 'Past Editions', route: '/past-editions', key: 'past-editions'},
    {name: 'empowerPL', route: '/empowerPL', key: 'empowerPL'},
  ];
  const staticPageRoutes: NavItem[] = staticPages.map( (p) => ({
    name: p.name, route: p.route, key: p.route.replace(/\//g, ''),
  }));
  res.locals.navLinks = [...nav, ...staticPageRoutes];
  next();
}

export function requireUser(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    res.redirect('/keystone/signin');
  } else {
    next();
  }
}

export async function getStaticPage(req: Request, res: Response, next: NextFunction) {
  const route = req.params.staticRoute;
  try {
    const staticPage = await list<StaticPage>('StaticPage').model
    .findOne({route, showInMenu: true, active: true})
    .exec();
    if (staticPage == null) {
      throw new Error(`${route} not found`);
    }
    res.locals.staticContent = staticPage.content;
    res.locals.route = route;
    res.render(resolveView('staticPage'));
} catch (e) {
    next(); // will fall through to a not found
  }
}

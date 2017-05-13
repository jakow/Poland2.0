import {list} from 'keystone';
import {Edition, EditionDocument} from '../models/Edition';
import {Sponsor} from '../models/Sponsor';
import {SponsorCategory} from '../models/SponsorCategory';
import {StaticPage} from '../models/StaticPage';
import {RequestHandler, Request, Response, NextFunction} from 'express';
import {environment} from '../config';
import reversePopulate from './helpers/reversePopulate';

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

export async function getSponsorsByCategory(req: Request, res: Response, next: NextFunction) {
  const currentEdition = res.locals.currentEdition as EditionDocument;
  try {
    const sponsors = await list<Sponsor>('Sponsor')
      .model.find({edition: currentEdition, category: { $ne: null }}).exec();
    const sponsorCategories = await list<SponsorCategory>('SponsorCategory')
      .model.find({edition: currentEdition}).exec();
    const sponsorsByCategory = reversePopulate(sponsorCategories, 'sponsors', sponsors, 'category');
    res.locals.sponsorCategories = sponsorsByCategory;
    res.locals.sponsors = sponsors;
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
  let staticPages;
  try {
    staticPages = await list<StaticPage>('StaticPage').model
      .find({active: true, showInMenu: true})
      .select({name: true, route: true})
      .exec();
  } catch (e) {
    next(e);
  }
  const nav: NavItem[] = [
    {name: 'About', route: '/about', key: 'about'},
    {name: 'Past editions', route: '/past-editions', key: 'past-editions'},
  ];
  const staticRoutes: NavItem[] = staticPages.map( (p) => ({
    name: p.name, route: p.route, key: p.route.replace(/\//g, ''),
  }));
  res.locals.nav = [...nav, ...staticRoutes];
  next();
}


export async function requireUser(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    res.redirect('/keystone/signin');
  } else {
    next();
  }
}

export async function getStaticPage(req: Request, res: Response, next: NextFunction) {
  let staticPage;
  console.log(req.route);
  try {
  staticPage = await list('StaticPage').model
  .findOne({showInMenu: true, active: true, route: req.route})
  .select({name: 1, route: 1, showInMenu: 1, menuOrder: 1})
  .exec();
  } catch (e) {
    // TODO: throw 404
  }
}

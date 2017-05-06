import {list} from 'keystone';
import {EditionDocument} from '../models/Edition';
import {StaticPage} from '../models/StaticPage';
import {RequestHandler, Request, Response, NextFunction} from 'express';
import {environment} from '../config';

export async function getCurrentEdition(req: Request, res: Response, next: NextFunction) {
  try {
    const currentEdition = await list<EditionDocument>('Edition').model.findOne({current: true}).exec();
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

// exports.initErrorHandlers = function(req, res, next) {

// };

// exports.getCurrentEdition = function(req, res, next) {
//     var q = keystone.list('Edition').model.findOne({current:true});
//     q.exec(function(err, result){
//       if(result)
//         res.locals.currentEdition = result;
//       next(err);
//     });
// };

// exports.loadSponsors = function(req, res, next) {

// };

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

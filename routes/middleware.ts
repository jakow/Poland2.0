

// TODO replace async lib  with async/await
import {list} from 'keystone';
import {EditionDocument} from '../models/Edition';
import {Request, Response, NextFunction} from 'express';
export async function getCurrentEdition(req: Request, res: Response, next: NextFunction) {
  try {
    const currentEdition = await list<EditionDocument>('Edition').model.findOne({current: true});
    res.locals.currentEdition = currentEdition;
    next();
  } catch (e) {
    next(e);
  }
}

/**
 * Initialises the standard view locals
 * The included layout depends on the navLinks array to generate
 * the navigation in the header, you may wish to change this array
 * or replace it with your own templates / logic.
 */

// exports.initLocals = function(req, res, next) {
// };


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

// exports.getStaticPages = function (req,res, next) {
//   keystone.list('StaticPage').model
//   .find({showInMenu: true})
//   .select({name: 1, route: 1, showInMenu: 1, menuOrder: 1})
//   .exec(function(err,result) {
//     if (result) {
//       res.locals.staticPages = result;
//       //insert menu items into navLinks
//       var navLinks = res.locals.navLinks;
//       var menuItems = result.filter(page => (page.showInMenu)).sort((a,b) => (Math.sign(a.menuOrder - b.menuOrder)));
//       for(var i = 0; i < menuItems.length; ++i) {
//         navLinks.splice(menuItems[i].menuOrder, //splice starting at menu order
//           0, // do not delete anything
//           { label: menuItems[i].name,		key: menuItems[i].route,		href: `/${menuItems[i].route}`});
//       }
//     }
//     next(err);

//   });
// };

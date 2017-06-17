/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

import * as keystone from 'keystone';
import * as express from 'express';
import * as cors from 'cors';
import * as middleware from './middleware';
import * as views from './views';
import * as api from './api';
// const importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.getCurrentEdition);
keystone.pre('routes', middleware.getContentControl);
keystone.pre('routes', middleware.getSponsorsByCategory);
keystone.pre('routes', middleware.initLocals);
// keystone.pre('routes', middleware.getStaticPages);

// TODO: set up 404 and 500 routes
// keystone.set('404', (req, res) => {
//   // middleware.loadSponsors(req, res);
// });
// keystone.set('500', (req, res) => {
//  // TODO 500 handler
// });

const router = express.Router();
  // Views
router.get('/', views.home);
router.get('/about', views.about);
router.get('/past-editions', views.pastEditions);

const allowCors = cors();

router.use('/api/questions',  allowCors, api.questions);
router.use('/api/speakers', allowCors, api.speakers);

// Static pages defined from Keystone admin
// app.get('/:pageRoute', views.staticPage); // dynamically registered static pages. Must be at bottom

// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
// app.get('/protected', middleware.requireUser, routes.views.protected);
export default router;

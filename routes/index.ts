import * as keystone from 'keystone';
import {Router} from 'express';
import * as cors from 'cors';
import * as middleware from './middleware';
import * as views from './views';
import * as api from './api';
// const importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.getCurrentEdition);
keystone.pre('routes', middleware.getContentControl);
keystone.pre('routes', middleware.initLocals);

// TODO: set up 404 and 500 routes

const router = Router();
// HTML views
router.get('/', views.home);
router.get('/about', views.about);
router.get('/past-editions', views.pastEditions);
router.all('/contact', views.contact);
// REST API
router.all(/api*/, cors());
router.use('/api/agenda', api.agenda);
router.use('/api/events', api.events);
router.use('/api/login', api.login);
router.use('/api/questions', api.questions);
router.use('/api/speakers', api.speakers);

// Static pages defined from admin pages
router.get('/:staticRoute', middleware.getStaticPage); // dynamically registered static pages. Must be at bottom!

// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
// app.get('/protected', middleware.requireUser, routes.views.protected);
export default router;

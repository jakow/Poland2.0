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

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.getContent);
keystone.pre('routes', middleware.loadSponsors);
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', middleware.getStaticPages);
keystone.pre('render', middleware.flashMessages);


keystone.set('404', function(req, res) {
	middleware.loadSponsors(req, res, 
		// a hack to invoke not found
		() => res.notFound()); 
	// fixes missing sponsors in footer 
});

keystone.set('500', function(req, res)
	{
		middleware.loadSponsors(req, res,
			// a hack to invoke an err
			(err) => res.err(err)); 
	});
// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {


	// Views
	app.get('/', middleware.getCurrentEdition, routes.views.index);
	// app.get('/news/:category?', routes.views.news);
	// app.get('/news/post/:post', routes.views.post);
	app.all('/contact', middleware.getCurrentEdition, routes.views.contact);
	app.all('/about', middleware.getCurrentEdition, routes.views.about);
	app.all('/past-editions', routes.views.pastEditions);
	app.all('/:pageRoute', routes.views.staticPage); // dynamically registered static pages. Must be at bottom
	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
};

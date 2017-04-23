if (process.env.NODE_ENV === 'development')
	require('dotenv').load();

const keystone = require('keystone');
// custom mongoose instance updated for high node versions and for higher performance bluebird promise library
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
keystone.init({

	'name': 'Poland 2.0',
	'brand': 'Poland 2.0',
	'static': ['public'],
	// 'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	// 'view engine': 'handlebars',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'mongoose': mongoose
});

keystone.set('signin logo', '/images/logo.svg');

keystone.import('models');

keystone.set('nav', {
	'editions': 'editions',
	'people': ['speakers', 'team-members'],
	'agenda': ['agenda-days', 'agenda-entries', 'venues'],
	'sponsors': ['sponsors', 'sponsor-categories'],
	'content': ['static-pages', 'content-controls'],
	'users': 'users',
});

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

//cloudinary
keystone.set('cloudinary config', process.env.CLOUDINARY_URL );

//openshift deployment
if(process.env.OPENSHIFT_NODEJS_PORT) {
	console.log('Setting node port');
	keystone.set('port', process.env.OPENSHIFT_NODEJS_PORT);
} else {
	keystone.set('port', 3000);
}

if(process.env.OPENSHIFT_NODEJS_IP) {
	console.log('setting node ip');
	keystone.set('host', process.env.OPENSHIFT_NODEJS_IP);
}

if (process.env.OPENSHIFT_MONGODB_DB_URL) {
	console.log('setting mongo url');
    keystone.set('mongo', process.env.OPENSHIFT_MONGODB_DB_URL);
} else {
	keystone.set('mongo',process.env.MONGO_URI || 'mongodb://localhost/poland-20');
}

if(process.env.OPENSHIFT_SECRET_TOKEN) {
	console.log('setting SECRET token');
	keystone.set('cookie secret', process.env.OPENSHIFT_SECRET_TOKEN);
}

if(process.env.NODE_ENV === 'production')
	keystone.set('session store', 'connect-mongo');
// Start Keystone to connect to your database and initialise the web server

// console.log(process.env.MONGO_URI);
keystone.start();

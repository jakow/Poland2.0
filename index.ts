import * as dotenv from 'dotenv';
if (process.env.NODE_ENV === 'development') {
  dotenv.load();
}
import * as Keystone from 'keystone';
// custom mongoose instance updated for high node versions and for higher performance bluebird promise library
import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as routes from './routes';
(mongoose as any).Promise = Promise; // to avoid compile errors

Keystone.init({
  'auth': true,
  'auto update': true,
  'brand': 'Poland 2.0',
  'mongoose': mongoose,
  'name': 'Poland 2.0',
  'session': true,
  'static': ['public'],
	// 'favicon': 'public/favicon.ico',
  'user model': 'User',
  'views': 'templates/views',
	// 'view engine': 'handlebars',
});

Keystone.set('signin logo', '/images/logo.svg');

Keystone.import('models');

Keystone.set('nav', {
  agenda: ['agenda-days', 'agenda-entries', 'venues'],
  content: ['static-pages', 'content-controls'],
  editions: 'editions',
  people: ['speakers', 'team-members'],
  sponsors: ['sponsors', 'sponsor-categories'],
  users: 'users',
});

Keystone.set('locals', {
  _: require('underscore'),
  editable: Keystone.content.editable,
  env: Keystone.get('env'),
  utils: Keystone.utils,
});

// Load your project's Routes

Keystone.set('routes', routes);

// cloudinary
Keystone.set('cloudinary config', process.env.CLOUDINARY_URL );

// openshift deployment
if (process.env.OPENSHIFT_NODEJS_PORT) {
  Keystone.set('port', process.env.OPENSHIFT_NODEJS_PORT);
} else {
  Keystone.set('port', 3000);
}

if (process.env.OPENSHIFT_NODEJS_IP) {
  Keystone.set('host', process.env.OPENSHIFT_NODEJS_IP);
}

if (process.env.OPENSHIFT_MONGODB_DB_URL) {
  Keystone.set('mongo', process.env.OPENSHIFT_MONGODB_DB_URL);
} else {
  Keystone.set('mongo', process.env.MONGO_URI || 'mongodb://localhost/poland-20');
}

if (process.env.OPENSHIFT_SECRET_TOKEN) {
  console.debug('setting SECRET token');
  Keystone.set('cookie secret', process.env.OPENSHIFT_SECRET_TOKEN);
}

if (process.env.NODE_ENV === 'production') {
  Keystone.set('session store', 'connect-mongo');
}
// Start Keystone to connect to your database and initialise the web server

// console.log(process.env.MONGO_URI);
Keystone.start();

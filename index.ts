import * as dotenv from 'dotenv';
if (process.env.NODE_ENV === 'development') {
  dotenv.config({path: '../.env'});
}
import * as keystone from 'keystone';
// custom mongoose instance updated for high node versions and for higher performance bluebird promise library
import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as path from 'path';
// import * as routes from './routes';

(mongoose as any).Promise = Promise; // to avoid compile errors

keystone.init({
  'auth': true,
  // 'auto update': true, // think about update format
  'brand': 'Poland 2.0',
  'mongoose': mongoose,
  'name': 'Poland 2.0',
  'session': true,
  'static': [path.resolve(__dirname, '..', 'public')], // assumes running from 'build' directory
	// 'favicon': 'public/favicon.ico',
  'user model': 'User',
  'views': 'templates/views',
	// 'view engine': 'handlebars',
});

keystone.set('signin logo', '/images/logo.svg');

// keystone.import('models');
import './models';

keystone.set('nav', {
  agenda: ['agenda-days', 'agenda-entries', 'venues'],
  content: ['static-pages', 'content-controls'],
  editions: 'editions',
  people: ['speakers', 'team-members'],
  sponsors: ['sponsors', 'sponsor-categories'],
  users: 'users',
});

keystone.set('locals', {
  _: require('underscore'),
  editable: keystone.content.editable,
  env: keystone.get('env'),
  utils: keystone.utils,
});


keystone.set('cloudinary config', process.env.CLOUDINARY_URL );

// openshift deployment
if (process.env.OPENSHIFT_NODEJS_PORT) {
  keystone.set('port', process.env.OPENSHIFT_NODEJS_PORT);
} else {
  keystone.set('port', 3000);
}

if (process.env.OPENSHIFT_NODEJS_IP) {
  keystone.set('host', process.env.OPENSHIFT_NODEJS_IP);
}

if (process.env.OPENSHIFT_MONGODB_DB_URL) {
  keystone.set('mongo', process.env.OPENSHIFT_MONGODB_DB_URL);
} else {
  keystone.set('mongo', process.env.MONGO_URI || 'mongodb://localhost/poland-20');
}

if (process.env.OPENSHIFT_SECRET_TOKEN) {
  console.info('setting SECRET token');
  keystone.set('cookie secret', process.env.OPENSHIFT_SECRET_TOKEN);
}

if (process.env.NODE_ENV === 'production') {
  keystone.set('session store', 'connect-mongo');
}
// Start Keystone to connect to your database and initialise the web server

// console.log(process.env.MONGO_URI);
keystone.start();

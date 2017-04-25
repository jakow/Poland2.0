import * as dotenv from 'dotenv';
import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as path from 'path';
import * as config from './config';
import routes from './routes';
import {initSockets} from './routes/sockets';
(mongoose as any).Promise = Promise;

keystone.init({
  'auth': true,
  // 'auto update': true, // think about alternative update format
  'brand': 'Poland 2.0',
  'name': 'Poland 2.0',
  'mongoose': mongoose,
  'static': [config.staticDir],
  'user model': 'User',
  'host': config.host,
  'port': config.port,
  'mongo': config.mongo,
  'cookie secret': config.cookieSecret,
  'cloudinary config': config.cloudinaryUrl,
  'cloudinary secure': true,
  'favicon': path.join(config.staticDir, 'images/favicons/favicon.ico'),
  'signin logo': '../images/logo.svg',
  'compress': true,
});

keystone.set('locals', {
  _: require('underscore'),
  editable: keystone.content.editable,
  env: keystone.get('env'),
  utils: keystone.utils,
});

if (config.environment === 'production') {
  keystone.set('session store', 'connect-mongo');
}

import './models';

keystone.set('nav', {
  agenda: ['agenda-days', 'agenda-entries', 'venues'],
  content: ['static-pages', 'content-controls'],
  editions: 'editions',
  people: ['speakers', 'team-members'],
  sponsors: ['sponsors', 'sponsor-categories'],
  users: 'users',
});

keystone.set('view engine', config.viewEngine);
keystone.set('views',  config.viewsDir);
keystone.set('routes', routes);
keystone.start({
  onHttpServerCreated() {
    initSockets(keystone.httpServer);
  },
});

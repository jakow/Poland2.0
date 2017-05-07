import 'source-map-support/register';
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
  'static': config.staticDirs,
  'user model': 'User',
  'host': config.host,
  'port': config.port,
  'mongo': config.mongo,
  'cookie secret': config.cookieSecret,
  'cloudinary config': config.cloudinaryUrl,
  'cloudinary secure': true,
  'favicon': path.join(config.publicDir, 'images/favicons/favicon.ico'),
  'signin logo': '../images/logo.svg',
  'compress': true,
});

keystone.set('locals', {
  editable: keystone.content.editable,
  env: config.environment,
  utils: keystone.utils,
  trackingId: config.trackingId,
  displayLocals: true,
});

console.info('Environment', keystone.get('env'));

if (config.environment === 'production') {
  keystone.set('session store', 'connect-mongo');
}

import './models';

keystone.set('nav', {
  agenda: ['agenda-days', 'agenda-events', 'venues'],
  content: ['static-pages', 'content-controls'],
  editions: 'editions',
  people: ['speaker-categories', 'speakers', 'team-members'],
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

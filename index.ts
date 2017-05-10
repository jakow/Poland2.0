import 'source-map-support/register';
import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as path from 'path';
import * as config from './config';
import routes from './routes';

import createAssetStore from './routes/helpers/assets';
(mongoose as any).Promise = Promise;

keystone.init({
  'auth': true,
  'auto update': true,
  'updates': path.resolve(config.rootDir, 'updates'),
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
  'logger': config.environment === 'production' ? 'tiny' : 'dev',
});

keystone.set('locals', {
  editable: keystone.content.editable,
  env: config.environment,
  utils: keystone.utils,
  trackingId: config.trackingId,
  displayLocals: true,
  assets: createAssetStore(),
});

console.info(`Running in ${config.environment} mode`);

if (config.environment === 'production') {
  keystone.set('session store', 'connect-mongo');
  // TODO: set Cache-Control on all assets, including JS and CSS since they are busted
  // keystone.set('static options', {});
}

// have to do this here after mongo and cloudinary are initialised. Kind of hacky.
import './models';
import {initSockets} from './routes/sockets';

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

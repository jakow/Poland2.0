import 'source-map-support/register';
import * as express from 'express';
import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as helmet from 'helmet';
import * as path from 'path';
import * as config from './config';
import routes from './routes';
import * as linkedData from './routes/helpers/linkedData';
import {initSockets} from './routes/sockets';
import imageHelpers from './routes/helpers/cloudinary';
import createAssetStore from './routes/helpers/assets';
(mongoose as any).Promise = Promise;

const app = express();

keystone.init({
  'auth': true,
  'auto update': true,
  'updates': path.resolve(config.rootDir, 'updates'),
  'brand': 'Poland 2.0',
  'name': 'Poland 2.0',
  'favicon': path.join(config.publicDir, 'images/favicons/favicon.ico'),
  'signin logo': '../images/logo.svg',
  'static': config.staticDirs,
  'user model': 'User',
  'host': config.host,
  'port': config.port,
  'compress': true,
  'mongo': config.mongo,
  'mongoose': mongoose,
  'logger': config.environment === 'production' ? 'tiny' : 'dev',
  'view engine': config.viewEngine,
  'views':  config.viewsDir,
  'routes': routes,
  'cookie secret': config.cookieSecret,
  'cloudinary config': config.cloudinaryUrl,
  'cloudinary secure': true,
  'google server api key': config.googleMapsServerKey,
  'google api key': config.googleMapsBrowserKey,
  'default region': 'gb',
});

if (config.environment === 'production') {
  // external, mongo-based session store. Built in store apparently leaks memory so needs to be replaced.
  keystone.set('session store', 'connect-mongo');
  keystone.set('static options', {
    cacheControl: true,
    maxAge: '30 days',
  });
  // security options
  app.use(helmet({
    dnsPrefetchControl: false,
    hidePoweredBy: false,
}));
}

// Locals variables added for each rendered Pug template
keystone.set('locals', {
  linkedData,
  env: config.environment,
  utils: keystone.utils,
  trackingId: config.trackingId,
  assets: createAssetStore(),
  imgTransform: imageHelpers(),
  sanitize: require('sanitize-html'),
  moment: require('moment'),
});

// have to do this here after mongo and cloudinary are initialised. Kind of hacky.
import './models';

// navigation in admin UI.
keystone.set('nav', {
  agenda: ['agenda-days', 'agenda-events', 'venues'],
  content: ['static-pages', 'content-controls'],
  editions: 'editions',
  people: ['speaker-categories', 'speakers', 'team-members'],
  sponsors: ['sponsors', 'sponsor-categories'],
  users: 'users',
});

keystone.initExpressApp(app);

keystone.start({
  onHttpServerCreated() {
    initSockets(keystone.httpServer);
  },
});

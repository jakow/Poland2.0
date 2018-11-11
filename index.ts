import 'source-map-support/register';
import * as express from 'express';
import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as helmet from 'helmet';
import * as path from 'path';
import * as next from 'next';
import * as config from './config';
import routes from './routes';
import { initSockets } from './routes/sockets';
import * as auth from './routes/api/auth';

(mongoose as any).Promise = Promise;

const app = next({ dev: config.environment === 'development' });

keystone.init({
  mongoose,
  auth: true,
  'auto update': true,
  updates: path.resolve(config.rootDir, 'updates'),
  brand: 'Poland 2.0 Summit',
  name: 'Poland 2.0',
  favicon: path.join(config.staticDir, 'images/favicons/favicon.ico'),
  'signin logo': '../static/images/logo.svg',
  'user model': 'User',
  host: config.host,
  port: config.port,
  compress: true,
  mongo: config.mongo,
  logger: config.environment === 'production' ? 'tiny' : 'dev',
  'cookie secret': config.cookieSecret,
  'cloudinary config': config.cloudinaryUrl,
  'cloudinary secure': true,
  // 'google server api key': config.googleMapsServerKey,
  // 'google api key': config.googleMapsBrowserKey,
  'default region': 'gb',
});

import './models';

app.prepare().then(() => {
  const server = express();
  server.use(auth.initialize());

  if (config.environment === 'production') {
    // external, mongo-based session store.
    // Built in store apparently leaks memory so needs to be replaced.
    keystone.set('session store', 'connect-mongo');
    // security options
    server.use(helmet({
      dnsPrefetchControl: false,
      hidePoweredBy: true,
    }));
  }

  keystone.set('routes', routes(app));

  // navigation in admin UI.
  keystone.set('nav', {
    agenda: ['agenda-days', 'agenda-events', 'agenda-event-categories', 'venues'],
    content: ['static-pages', 'content-controls'],
    editions: 'editions',
    people: ['speaker-categories', 'speakers', 'team-members'],
    sponsors: ['sponsors', 'sponsor-categories'],
    users: 'users',
    notifications: ['push-devices', 'notifications']
  });

  keystone.initExpressApp(server);

  keystone.start({
    onHttpServerCreated() {
      initSockets(keystone.httpServer);
    },
  });
});

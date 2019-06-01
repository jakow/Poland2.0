// import 'source-map-support/register';
// import * as express from 'express';
// import * as keystone from 'keystone';
// import * as mongoose from 'mongoose';
// import * as helmet from 'helmet';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Path from 'path';
import * as Next from 'next';
import * as Config from './config';
const strapi = require('strapi')();
// import routes from './routes';
// import { initSockets } from './routes/sockets';
// import * as auth from './routes/api/auth';

// (mongoose as any).Promise = Promise;

const app = Next({ dev: Config.environment === 'development' });
const handle = app.getRequestHandler();

// keystone.init({
//   mongoose,
//   auth: true,
//   'auto update': true,
//   updates: path.resolve(config.rootDir, 'updates'),
//   brand: 'Poland 2.0 Summit',
//   name: 'Poland 2.0',
//   favicon: path.join(config.staticDir, 'images/favicons/favicon.ico'),
//   'signin logo': '../static/images/logo.svg',
//   'user model': 'User',
//   host: config.host,
//   port: config.port,
//   compress: true,
//   mongo: config.environment === 'development' ? 'mongodb://localhost/poland-20' : config.mongo,
//   logger: config.environment === 'production' ? 'tiny' : 'dev',
//   'cookie secret': config.cookieSecret,
//   'cloudinary config': config.cloudinaryUrl,
//   'cloudinary secure': true,
//   // 'google server api key': config.googleMapsServerKey,
//   // 'google api key': config.googleMapsBrowserKey,
//   'default region': 'gb',
// });

// import './models';

app.prepare().then(() => {
  strapi.start();
  const server: Koa = strapi.app;
  const router = new Router();

  router.get('/robots.txt', async (context) => {
    await app.serveStatic(context.req, context.res, Path.join(Config.staticDir, 'robots.txt'));
    context.respond = false;
  });

  router.get('*', async (ctx, next) => {
    // The ctx url could be modified before this middleware is run, so cache the original URL
    const beforeUrl = ctx.req.url;
    // Run all of the other middlewares
    await next();
    // If we still have a status of 404, let next.js handle the request
    if (ctx.response.status === 404) {
      ctx.url = beforeUrl;
      // Handle the request
      await handle(ctx.req, ctx.res);
      // Request sent, now clobber everything else so that the rest of
      // the middlewares (looking at you koa-compress) don't think
      // we are trying to send something
      delete ctx.body;
      ctx.respond = false;
      ctx.headersSent = true;
    }
  });

  // router.get('*', async (context) => {
  //   await handle(context.req, context.res);
  //   context.respond = false;
  // });

  // server.use(async (context, next) => {
  //   context.res.statusCode = 200;
  //   await next();
  // });

  server.use(router.routes());
  // server.listen(Config.port, () => {
  //   console.log(`> Ready on http://localhost:${config.port}`);
  // });

  // if (config.environment === 'production') {
  //   // external, mongo-based session store.
  //   // Built in store apparently leaks memory so needs to be replaced.
  //   // keystone.set('session store', 'connect-mongo');
  //   // security options
  //   server.use(helmet({
  //     dnsPrefetchControl: false,
  //     hidePoweredBy: true,
  //   }));
  // }

  // keystone.set('routes', routes(app));

  // // navigation in admin UI.
  // keystone.set('nav', {
  //   agenda: ['agenda-days', 'agenda-events', 'agenda-event-categories', 'venues'],
  //   content: ['static-pages', 'content-controls'],
  //   editions: 'editions',
  //   people: ['speaker-categories', 'speakers', 'team-members'],
  //   sponsors: ['sponsors', 'sponsor-categories'],
  //   users: 'users',
  //   notifications: ['push-devices', 'notifications']
  // });

  // keystone.initExpressApp(server);

  // keystone.start({
  //   onHttpServerCreated() {
  //     initSockets(keystone.httpServer);
  //   },
  // });
});

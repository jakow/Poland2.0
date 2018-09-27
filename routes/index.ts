// import * as Keystone from 'keystone';
import { Router } from 'express';
import * as CORS from 'cors';
import Middleware from './middleware';
import * as Views from './views';
import * as API from './api';
import * as Next from 'next';
import { IncomingMessage, ServerResponse } from 'http';

export default (next: Next.Server) => {
  const nextHandler = next.getRequestHandler();
  const router = Router();

  router.all(/api*/, CORS());
  router.use('/api/agenda', API.agenda);
  router.use('/api/events', API.events);
  router.use('/api/login', API.login);
  router.use('/api/questions', API.questions);
  router.use('/api/speakers', API.speakers);
  router.use('/middleware', Middleware);

  router.use('/views/home', Views.home);
  router.use('/views/about', Views.about);
  router.use('/views/past-editions', Views.pastEditions);
  router.use('/views/empowerPL', Views.empowerPL);

  router.get('*', (request: IncomingMessage, response: ServerResponse) =>
    nextHandler(request, response)
  );

  return router;
};

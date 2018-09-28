import { Router } from 'express';
import Middleware from './middleware';
import Views from './views';
import API from './api';
import Next from 'next';
import { IncomingMessage, ServerResponse } from 'http';

export default (next: Next.Server) => {
  const nextHandler = next.getRequestHandler();
  const router = Router();

  router.use('/api', API);
  router.use('/middleware', Middleware);
  router.use('/views', Views);

  router.get('*', (request: IncomingMessage, response: ServerResponse) =>
    nextHandler(request, response)
  );

  return router;
};

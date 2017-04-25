import * as express from 'express';
import * as keystone from 'keystone';
import resolveView from '../helpers/resolveView';
export const home: express.RequestHandler = (req, res, err) => {
  const view = new keystone.View(req, res);
  view.render(resolveView('home'));
};

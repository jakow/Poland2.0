import {View} from 'keystone';
import {RequestHandler} from 'express';
import resolveView from '../helpers/resolveView';

export const mentoring: RequestHandler = async (req, res, next) => {
    res.locals.route = 'mentoring';
    const view = new View(req, res);

    view.render(resolveView('mentoring'));
  };
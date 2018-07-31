import {View} from 'keystone';
import {RequestHandler} from 'express';
import resolveView from '../helpers/resolveView';

export const empowerPL: RequestHandler = async (req, res, next) => {
    res.locals.route = 'empowerPL';
    const view = new View(req, res);

    view.render(resolveView('empowerPL'));
  };
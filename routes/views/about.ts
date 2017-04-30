import {list, View} from 'keystone';
import {RequestHandler} from 'express';
import {EditionDocument} from '../../models/Edition';
import {TeamMember} from '../../models/TeamMember';
import resolveView from '../helpers/resolveView';
export const about: RequestHandler = async (req, res, next) => {
  const view = new View(req, res);
  const currentEdition = res.locals.currentEdition as EditionDocument;
  const team = await list<TeamMember>('TeamMember').model.find({edition: currentEdition}).exec();
  res.locals.team = team;
  view.render(resolveView('about'));
};

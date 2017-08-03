import {list, View} from 'keystone';
import {RequestHandler} from 'express';
import {EditionDocument} from '../../models/Edition';
import {TeamMember} from '../../models/TeamMember';
import resolveView from '../helpers/resolveView';
export const about: RequestHandler = async (req, res, next) => {
  res.locals.route = 'about';
  const view = new View(req, res);
  const currentEdition = res.locals.currentEdition as EditionDocument;
  let team;
  if (currentEdition != null) {
    team = await list<TeamMember>('TeamMember').model.find({edition: currentEdition}).exec();
  }
  res.locals.team = team;
  view.render(resolveView('about'));
};

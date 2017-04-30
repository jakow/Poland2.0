import {RequestHandler} from 'express';
import {list, View} from 'keystone';
import resolveView from '../helpers/resolveView';
import {Edition, EditionDocument} from '../../models/Edition';
import {Speaker} from '../../models/Speaker';
import {TeamMember} from '../../models/TeamMember';

interface PastEdition extends Edition {
  speakers: Speaker[];
  teamMembers: TeamMember[];
}

export const pastEditions: RequestHandler = async (req, res, next) => {
  // TODO: some eror handling in routes
  const view = new View(req , res);
  const currentEditon = res.locals.edition as EditionDocument; // always available as a local
  const editions = await list<Edition>('Edition').model.find({current: false}).exec();
  const teamMembers = await list<TeamMember>('TeamMember').model.find().where('edition').ne(currentEditon);
  const speakers = await list<Speaker>('Speaker').model.find().where('edition').ne(currentEditon);
  res.locals.editions = editions;
  res.locals.teamMembers = teamMembers;
  res.locals.speakers = speakers;
  view.render(resolveView('pastEditions'));
};

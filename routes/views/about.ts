import { list } from 'keystone';
import { RequestHandler } from 'express';
import { TeamMember } from '../../models/TeamMember';
import { Edition } from '../../models';

export const about: RequestHandler = async (req, res, next) => {
  const currentEdition = await list<Edition>('Edition').model.findOne({ current: true }).exec();
  let team;
  if (currentEdition != null) {
    team = await list<TeamMember>('TeamMember').model.find({ edition: currentEdition })
      .sort('sortOrder').exec();
  }
  res.json({ team });
};

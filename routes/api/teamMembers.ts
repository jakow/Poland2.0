import { Router, Request, Response } from 'express';
import { list } from 'keystone';
import { TeamMember } from '../../models/TeamMember';
import { Edition } from '../../models/Edition';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

export const teamMembers = Router();

/**
 * Get all team members. Only team members for current edition are sent.
 */
async function getAll(req: Request, res: Response) {
  const currentEdition = await list<Edition>('Edition').model.findOne({ current: true }).exec();
  if (currentEdition === null) {
    res.send([]);
    return;
  }
  try {
    const s = await list<TeamMember>('TeamMember').model.find({edition: currentEdition}).sort('sortOrder').exec();
    res.send(s);
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).send(e);
  }
}

teamMembers.get('/', getAll);

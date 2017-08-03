import {Router, Request, Response} from 'express';
import {list} from 'keystone';
import {Speaker, SpeakerDocument} from '../../models/Speaker';
import {Edition} from '../../models/Edition';
import {INTERNAL_SERVER_ERROR} from 'http-status-codes';

export const speakers = Router();

/**
 * Get all speakers. Only speakers for current edition are sent.
 */
async function getAll(req: Request, res: Response) {
  const currentEdition = await list<Edition>('Edition').model.findOne({current: true}).exec();
  if (currentEdition === null) {
    res.send([]);
    return;
  }
  try {
    const s = await list<Speaker>('Speaker').model.find({edition: currentEdition})
      .select({description: 0})
      .populate({
        path: 'speakerCategory',
        select: 'displayName _id sortOrder',
      }).exec();
    res.send(s);
  } catch (e) {
      res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

speakers.get('/', getAll);

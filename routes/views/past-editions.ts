import { RequestHandler } from 'express';
import { list, RawDocument, Schema } from 'keystone';
import { Edition, Speaker, TeamMember } from '../../models';
import { getCurrentEdition } from '../middleware';

interface PastEdition extends RawDocument<Edition> {
  speakers?: Speaker[];
  teamMembers?: TeamMember[];
}

interface SpeakerMap {
  [key: string]: Speaker[];
}

interface TeamMemberMap {
  [key: string]: TeamMember[];
}

interface HasEdition {
  edition: Schema.Relationship[];
}

function group<T extends HasEdition>(children: T[], parents: RawDocument<Edition>[]) {
  const map: {[key: string]: T[]} = {};
  for (const parent of parents) {
    map[parent._id] = [];
  }
  for (const child of children) {
    const editions = child.edition;
    for (const edition of editions) {
      if (!(edition.toString() in map)) {
        map[edition.toString()] = [];
      }
      map[edition.toString()].push(child);
    }
  }

  return map;
}

export const pastEditions: RequestHandler = async (req, res) => {
  const currentEdition = await getCurrentEdition();
  const editions = (await list<Edition>('Edition').model
    .find({ current: false }).lean().exec()) as PastEdition[];

  const teamMembersDocs = await list<TeamMember>('TeamMember').model.find()
    .where('edition').ne(currentEdition)
    .exec();

  const speakersDocs = await list<Speaker>('Speaker').model.find()
    .where('edition').ne(currentEdition).exec();

  const speakerMap: SpeakerMap = group<Speaker>(speakersDocs, editions);
  const teamMemberMap: TeamMemberMap = group<TeamMember>(teamMembersDocs, editions);
  editions.forEach((e) => {
    e.speakers = speakerMap[e._id];
    e.teamMembers = teamMemberMap[e._id];
  });

  res.json({
    editions,
    years: editions.map(e => e.year)
  });
};

import {  list, get } from 'keystone';
import { EditionDocument } from '../../models/Edition';
import { SpeakerCategory } from '../../models/SpeakerCategory';
import { Speaker } from '../../models/Speaker';
import reversePopulate from '../helpers/reversePopulate';

export default async function getSpeakersByCategory(edition: EditionDocument) {
  if (!edition) {
    return null;
  }
  // const speakers = await list<Speaker>('Speaker').model.find({ edition, speakerCategory: {$ne: null}}).exec();
    // store a handle to all speakers as well
  // const speakerCategories = await list<SpeakerCategory>('SpeakerCategory').model.find({edition}).exec();
  const [speakers, speakerCategories] = await Promise.all([
    list<Speaker>('Speaker').model.find({ edition, speakerCategory: { $ne: null } }).exec(),
    list<SpeakerCategory>('SpeakerCategory').model.find({ edition }).exec(),
  ]);
  return reversePopulate(speakerCategories, 'speakers', speakers, 'speakerCategory');
}

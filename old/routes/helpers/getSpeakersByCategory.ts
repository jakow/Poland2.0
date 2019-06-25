import {  list, get } from 'keystone';
import { EditionDocument } from '../../models/Edition';
import { SpeakerCategory } from '../../models/SpeakerCategory';
import { Speaker } from '../../models/Speaker';
import reversePopulate from '../helpers/reversePopulate';

export default async function getSpeakersByCategory(edition: EditionDocument) {
  if (!edition) {
    return null;
  }

  const [speakers, speakerCategories] = await Promise.all([
    list<Speaker>('Speaker').model.find({ edition, speakerCategory: { $ne: null } })
      .sort('-sortOrder').exec(),
    list<SpeakerCategory>('SpeakerCategory').model.find({ edition }).sort('-sortOrder').exec(),
  ]);
  return reversePopulate(speakerCategories, 'speakers', speakers, 'speakerCategory');
}

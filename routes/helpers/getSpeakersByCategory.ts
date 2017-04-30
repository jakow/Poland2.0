  // get current speaker categories
import {SpeakerDocument} from '../../models/Speaker';
import {SpeakerCategory, SpeakerCategoryDocument} from '../../models/SpeakerCategory';
import {EditionDocument} from '../../models/Edition';
import {list, Lean} from 'keystone';

import {keyBy} from 'lodash';
interface SpeakerCategoryWithSpeakers extends SpeakerCategory {
  speakers: SpeakerDocument[];
}

export default async function getSpeakersByCategory(edition?: EditionDocument | string) {
  const filter = !!edition ? {edition} : {};
  const speakerCategories = (await list<SpeakerCategory>('SpeakerCategory')
    // if editionId is null will give all editions
    .model.find(filter).lean().exec()) as Array<Lean<SpeakerCategoryWithSpeakers>>;
  // init arrays
  speakerCategories.forEach( (c) => c.speakers = []);
  // rather than querying each speaker category for each speaker
  // we do a reverse populate of the speakerCategory document
  // TODO: refactor this as a function for reusability
  const speakers = await list<SpeakerDocument>('Speaker').model.find(filter).exec();

  const categoryMap = keyBy(speakerCategories, '_id');
  for (const speaker of speakers) {
    // it is known that speakerCategory is one-to-many so the cast below is safe
    const speakerCategory = speaker.speakerCategory.toString();
    if (speakerCategory in categoryMap) {
      categoryMap[speakerCategory].speakers.push(speaker);
    }
  }
  return speakerCategories;
}

import {list} from 'keystone';
import {keyBy} from 'lodash';
import {Document} from 'mongoose';

/**
 * Given parent documents and child documents containing the reference to one or more parent documents,
 * place a child array in a field of each parent document that the child references.
 *
 * For instance, having a set of speakerCategories and speakers, a call to
 * `reversePopulate(speakerCategories, 'speakers', speakers, 'speakerCategory') will look at child.speakerCategory
 * field to determine that speakerCategories.speakers should be an array of children where
 * speakerCategory._id == child.speakerCategory.
 */

export default function reversePopulate<Parent extends Document, Child extends Document, ChildKey extends keyof Child>
(parents: Parent[], parentKey: string, children: Child[], childKey: ChildKey) {
  type PopulatedParent = Parent & {[key: string]: Child[]};
  const populatedParents = parents.map((p) => p.toObject()) as PopulatedParent[];
  populatedParents.forEach((p) => p[parentKey] = []);
  const parentMap = keyBy(populatedParents, '_id');
  for (const ch of children) {
    let childRefs = ch[childKey];
    // also need to handle many to many relationships
    if (!Array.isArray(childRefs)) {
      childRefs = [childRefs];
    }
    for (const ref of childRefs) {
      if (ref in parentMap) {
        parentMap[ref][parentKey].push(ch);
      }
    }
  }
  return populatedParents;
}

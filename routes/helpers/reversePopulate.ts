import {Document} from 'mongoose';
/**
 * Populate the parents of one-to-many relationships with their children who hold
 * the reference to their object IDs.
 *
 * As an example, let's say we have a Post model which contains an `author` field
 * Using `reversePopulate(author, 'posts')` will place a field
 * @param parent The parent document(s) to populate with child data
 * @param The child model to populate the parents
 * @param options
 * @param field
 */

interface ReversePopulateOptions {
  // filter the fetched children
  filter: object;
  // populate the fetched children with comma separated fields given in this parameter
  populate: string;
}

export async function reversePopulate<Parent, PDoc extends Document & Parent, Child, CDoc extends Document & Child >
(parent: PDoc | PDoc[], child: CDoc, options?: ReversePopulateOptions): Promise<Parent> {
  if (!Array.isArray(parent)) {
      parent = [parent];
  }
  // todo fetch all children
  return null;
}

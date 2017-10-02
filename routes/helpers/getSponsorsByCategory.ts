import { list } from 'keystone';
import { Edition, EditionDocument} from '../../models/Edition';
import { Sponsor } from '../../models/Sponsor';
import { SponsorCategory } from '../../models/SponsorCategory';
import reversePopulate from '../helpers/reversePopulate';

export default async function getSponsorsByCategory(sponsorFilter: any = {}, categoryFilter: any = {}) {
  const sponsors = await list<Sponsor>('Sponsor').model
    .find({category: { $ne: null }, ...sponsorFilter}).exec();
  const sponsorCategories = await list<SponsorCategory>('SponsorCategory').model
    .find(categoryFilter).sort('sortOrder').exec();
  return reversePopulate(sponsorCategories, 'sponsors', sponsors, 'category');
}

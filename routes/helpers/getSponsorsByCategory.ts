import { list } from 'keystone';
import { Edition, EditionDocument} from '../../models/Edition';
import { Sponsor } from '../../models/Sponsor';
import { SponsorCategory } from '../../models/SponsorCategory';
import reversePopulate from '../helpers/reversePopulate';

export default async function getSponsorsByCategory(edition: EditionDocument = null, categoryFilter: any = {}) {
    const sponsors = await list<Sponsor>('Sponsor').model
      .find({edition, category: { $ne: null } }).exec();
    const sponsorCategories = await list<SponsorCategory>('SponsorCategory').model
      .find({edition, ...categoryFilter}).sort('-sortOrder').exec();
    return reversePopulate(sponsorCategories, 'sponsors', sponsors, 'category');
}

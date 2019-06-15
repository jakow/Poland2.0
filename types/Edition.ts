import { Venue } from 'types/Venue';
import { CloudinaryPhoto } from 'types/Cloudinary';

export type Edition = {
  isoString: string;
  dateString: string;
  venue: Venue;
  photos?: CloudinaryPhoto[];
};

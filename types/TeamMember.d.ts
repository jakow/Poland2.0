import { CloudinaryPhoto } from './Cloudinary';
import Edition from './Edition';

type TeamMember = {
  name: string;
  editions?: Edition[];
  email?: string;
  description?: string;
  instagram?: string;
  linkedin?: string;
  organisation: string;
  position: string;
  photo: CloudinaryPhoto;
};

export default TeamMember;

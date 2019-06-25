import { CloudinaryPhoto } from "./Cloudinary";
import Edition from "./Edition";

type TeamMember = {
    name: string;
    position: string;
    organisation: string;
    photo: CloudinaryPhoto;
    description: string;
    email: string;
    linkedin: string;
    editions: Edition[];
};

export default TeamMember;
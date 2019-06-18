import { CloudinaryPhoto } from "./Cloudinary";
import { AgendaEvent } from "./Agenda";
import Edition from "./Edition";
import SpeakerCategory from "./SpeakerCategory";

type Speaker = {
    name: string;
    occupation: string;
    organisation: string;
    photo: CloudinaryPhoto;
    description: string;
    category: SpeakerCategory;
    agendaEvents: AgendaEvent[];
    editions: Edition[];
}

export default Speaker;

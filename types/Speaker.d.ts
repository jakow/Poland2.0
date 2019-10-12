import { CloudinaryPhoto } from './Cloudinary';
import { AgendaEventType } from './Agenda';
import Edition from './Edition';

type Speaker = {
    name: string;
    occupation?: string;
    organisation: string;
    photo: CloudinaryPhoto;
    description?: string;
    category?: string;
    agendaEvents?: AgendaEventType[];
    editions?: Edition[];
}

export default Speaker;

import { CloudinaryPhoto } from './Cloudinary';
import { AgendaEvent } from './Agenda';
import Edition from './Edition';

type Speaker = {
    name: string;
    occupation?: string;
    organisation: string;
    photo: CloudinaryPhoto;
    description?: string;
    category?: string;
    agendaEvents?: AgendaEvent[];
    editions?: Edition[];
}

export default Speaker;

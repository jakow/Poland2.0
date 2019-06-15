import { Venue } from 'types/Venue';
import { CloudinaryPhoto } from 'types/Cloudinary';

export type EventCategory = {
  name: string;
  color: string;
};

export type EventSpeaker = {
  name: string;
  photo: CloudinaryPhoto;
  company?: string;
};

export type EventTime = {
  start?: string;
  end?: string;
};

export type EventType = {
  name: string;
  type: string;
  description: string;
  slug: string;
  category?: EventCategory;
  time?: EventTime;
  speakers?: EventSpeaker[];
  venue?: Venue;
};

export type AgendaDay = {
  name: string;
  date: Date;
  description: string;
  venue: string;
  events?: EventType[];
};

export type AgendaType = {
  days: AgendaDay[];
};

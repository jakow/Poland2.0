import Venue from './Venue';
import Edition from './Edition';
import Speaker from './Speaker';

export type AgendaEventCategory = {
  name: string;
  color: string;
};

export type AgendaEventType = {
  name: string;
  type: string;
  description: string;
  category: AgendaEventCategory;
  startTime: string;
  endTime: string;
  speakers: Speaker[];
};

export type AgendaDayType = {
  name: string;
  date?: string;
  description: string;
  venue: Venue;
  events: AgendaEventType[];
  edition?: Edition;
};

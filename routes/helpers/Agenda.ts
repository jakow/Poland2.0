import {AgendaEventDocument} from '../../models/AgendaEvent';

export interface AgendaDay {
  date: Date;
  events: AgendaEventDocument[];
}

export interface Agenda {
  days: AgendaDay[];
}

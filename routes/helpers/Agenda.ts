export interface AgendaDay {
  date: Date;
}
export class Agenda {
  public readonly days: AgendaDay[];
}
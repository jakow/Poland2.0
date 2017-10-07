import * as React from 'react';

export interface AgendaDay {
  _id: string;
  agendaEvents: AgendaEvent[];
}

export interface AgendaEvent {
  _id: string;

}

export interface AgendaProps {
  agendaDays: AgendaDay[];
}

export default function Agenda(props: AgendaProps) {

}
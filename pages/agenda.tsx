import { FunctionComponent } from 'react';
import { DefaultPageProps } from './_app';
import Agenda from '../components/organisms/Agenda';
import Background from '../components/atoms/Background';

const AgendaPage: FunctionComponent<DefaultPageProps> = ({ currentEdition }) => (
  <Background>
    <Agenda
      agendaDays={currentEdition.agendaDays}
      year={currentEdition.previousAgendaYear && currentEdition.previousAgendaYear}
    />
  </Background>
);

export default AgendaPage;

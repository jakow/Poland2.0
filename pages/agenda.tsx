import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import Container from '../components/atoms/Container';
import { withBackground } from '../components/hoc';
import AgendaDay from '../components/organisms/Agenda/AgendaDay';
import {
  bold, fat, rhythm,
} from '../components/typography';
import { colors } from '../components/variables';
import { DefaultPageProps } from './_app';
import Agenda from '../components/organisms/OldAgenda';

const Main = styled('main')({
  marginBottom: rhythm(1),
});

const Heading = styled('h1')(bold, fat);

const AgendaPage: FunctionComponent<DefaultPageProps> = ({ currentEdition }) => (
  <Container style={{ color: `${colors.white}` }}>
    <Heading>
      {!currentEdition.previousAgendaYear ? 'Agenda' : `Agenda of ${currentEdition.previousAgendaYear}`}
    </Heading>
    <Main>
      {currentEdition.agendaDays && currentEdition.agendaDays.map((day, index) => <AgendaDay {...day} key={index} />)}
    </Main>
  </Container>
);

export default withBackground(AgendaPage, colors.green.darken(0.5));

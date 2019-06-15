import * as React from 'react';
import styled from '@emotion/styled';
import { AgendaType } from '../../types/Agenda';
import Container from '../Container';
import { bold, Center, dangerousSuperscripts, fat, rhythm, stripe } from '../typography';
import { colors } from '../variables';
import { DayItem, DayList, Description } from './Day';
import { Event, EventList } from './Event';

const Main = styled('main')({
  position: 'relative',
  marginBottom: rhythm(1),
});

const Heading = styled('h1')(bold, fat, stripe);

const Section = styled('section')({
  paddingBottom: rhythm(1)
});

const Timeline = styled('div')({
  position: 'absolute',
  top: rhythm(0.5),
  bottom: rhythm(0.5),
  left: rhythm(0.6),
  width: 4,
  backgroundColor: `${colors.primary}`,
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: `-${rhythm(0.5)}`,
    width: 0,
    height: 0,
    left: `-${rhythm(0.45)}`,
    borderLeft: `${rhythm(0.5)} solid transparent`,
    borderRight: `${rhythm(0.5)} solid transparent`,
    borderTop: `${rhythm(0.5)} solid ${colors.primary}`,
  },
});

interface Props {
  agenda: AgendaType;
}

const Agenda: React.StatelessComponent<Props> = ({ agenda }) => (
  <Section id="agenda">
    <Container>
      <Center>
        <Heading>
          Agenda
        </Heading>
      </Center>
      <Main>
        <DayList>
          {agenda.days.map((day, index) => {
            return (
              <DayItem key={index}>
                <Description>
                  <h3 dangerouslySetInnerHTML={dangerousSuperscripts(day.name)}/>
                  {day.description && <p>{day.description}</p>}
                </Description>
                {day.events &&
                  <EventList>
                    {day.events.map((event, index) =>
                      <Event key={index} event={event}/>,
                    )}
                  </EventList>
                }
              </DayItem>
            );
          })}
        </DayList>
        <Timeline/>
      </Main>
    </Container>
  </Section>
);

export default Agenda;

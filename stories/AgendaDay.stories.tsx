import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Container from '../components/atoms/Container';
import AgendaDay from '../components/organisms/Agenda/AgendaDay';
import { rhythm } from '../components/typography';
import { colors } from '../components/variables';
import Venue from '../types/Venue';
import Speaker from '../types/Speaker';
import { AgendaEventType, AgendaDayType } from '../types/Agenda';

storiesOf('AgendaDay', module)
  .add('default view', () => {
    const place: Venue = {
      name: 'The Royal Society',
      location: 'Imperial College London, Kensington, London, SW7 2AZ',
    };

    const speaker: Speaker = {
      name: 'Grzegorz Brzęczyszczykiew',
      organisation: 'BCG',
      photo: {
        url: 'pqrpqwsuvg2mynfi2pvo',
      },
    };

    const event: AgendaEventType = {
      name: 'Why Technological Innovation is the Necessary Step Forward in Medicine and Healthcare',
      type: 'Panel',
      description: 'We are proud to host top leaders from industry, government, and academia in the Finance block.',
      category: {
        name: 'Finance',
        color: 'white',
      },
      startTime: '2019-10-26T09:59:00Z',
      endTime: '2019-10-26T13:00:00Z',
      speakers: [speaker, speaker, speaker, speaker, speaker],
    };

    const event2 = Object.assign({}, event);
    event2.category = Object.assign({}, event.category);
    event2.category.name = 'Digital';
    event2.category.color = '#70d8d1';
    event2.description = null;

    const day: AgendaDayType = {
      name: 'Friday, October 26th',
      description: 'Lorem ipsum bla bla bla',
      venue: place,
      events: [event, event2],
    };

    return (
      <div style={{
        backgroundColor: `${colors.purple}`,
        color: `${colors.white}`,
        paddingTop: rhythm(1),
        minHeight: '100vh',
      }}
      >
        <Container style={{ maxWidth: 640 }}>
          <AgendaDay {...day} />
        </Container>
      </div>
    );
  });

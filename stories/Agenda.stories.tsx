import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Agenda from 'components/Agenda';
import { colors } from 'components/variables';
import Venue from 'types/Venue';
import Speaker from 'types/Speaker';
import { AgendaEvent, AgendaDay } from 'types/Agenda';

storiesOf('Agenda', module)
  .add('default view', () => {

    const place: Venue = {
      name: 'Skempton Building',
      location: 'Imperial College London\nKensington\nLondon\nSW7 2AZ'
    };

    const speaker: Speaker = {
      name: 'Janusz',
      organisation: 'BCG',
      photo: {
        url: 'pqrpqwsuvg2mynfi2pvo'
      }
    };

    const event: AgendaEvent = {
      name: 'Why Fintechs Will Kill Banks in a Swift Move',
      type: 'Panel',
      description: 'We are proud to host top leaders from industry, government, and academia in the\
 Finance block.',
      category: {
        name: 'Finance',
        color: '#587dad',
      },
      startTime: '2018-11-24T09:00:00Z',
      endTime: '2018-11-24T11:00:00Z',
      speakers: [speaker, speaker, speaker, speaker, speaker]
    };

    const day: AgendaDay = {
      name: 'Friday, November 24th',
      description: 'Lorem ipsum bla bla bla',
      venue: place,
      events: [event, event],
    };

    const days = [day, day];

    return (
      <div style={{ backgroundColor: `${colors.lightGray}` }}>
        <Agenda agendaDays={days}/>
      </div>
    );
  });

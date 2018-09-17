import React from 'react';
import styled from 'react-emotion';
import withDefault, { DefaultProps } from './_app';
import { Banner, colors, Agenda } from 'p20-components';
import { AgendaType } from 'p20-components/types/Agenda';
import { SpeakerCategory, Speaker } from '../models';
import Tickets from '../components/Tickets';
import Speakers from '../components/Speakers';

interface Props {
  speakerCategories: SpeakerCategories;
  agenda: AgendaType;
}

const Background = styled('section')({
  '& > *:nth-child(even)': {
    backgroundColor: `${colors.lightGray}`
  },
  '& > *:nth-child(odd)': {
    backgroundColor: `${colors.white}`
  }
});

export type SpeakerCategories = (SpeakerCategory & { speakers: Speaker[] })[];

class Home extends React.Component<DefaultProps & Props> {
  render() {
    const { agenda, currentEdition, contentControl, speakerCategories } = this.props;
    return (
      <React.Fragment>
        {contentControl.tickets.live && contentControl.tickets.showSection &&
          <Tickets tickets={contentControl.tickets}/>
        }
        <Banner
          currentEdition={currentEdition}
          description={contentControl.description}
        />
        <Background>
          {contentControl.showSpeakers &&
            <Speakers speakerCategories={speakerCategories}/>
          }
          {contentControl.showAgenda &&
            <Agenda agenda={agenda}/>
          }
        </Background>
      </React.Fragment>
    );
  }
}

export default withDefault(Home, async () => {
  const data = await fetch('http://localhost:9009/views/home')
    .then(data => data.json());
  return { ...data };
});

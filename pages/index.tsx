import React from 'react';
import styled from '@emotion/styled';
import { DefaultProps } from './_app';
import Speakers from '../components/Speakers';
import Sponsors from '../components/Sponsors';
import { SpeakerCategories, SponsorCategories } from '../components/types';
import { NextFunctionComponent } from 'next';
import { AgendaType } from 'types/Agenda';
import { colors } from 'components/variables';
import Banner from 'components/Banner';
import Agenda from 'components/Agenda';

interface Props {
  speakerCategories: SpeakerCategories;
  sponsorCategories: SponsorCategories;
  previousSponsorCategories: SponsorCategories;
  agenda: AgendaType;
}

export const Background = styled('section')({
  '& > *:nth-child(odd)': {
    backgroundColor: `${colors.lightGray}`
  },
  '& > *:nth-child(even)': {
    backgroundColor: `${colors.white}`
  }
});

const Home: NextFunctionComponent<DefaultProps & Props> = ({
  agenda,
  currentEdition,
  contentControl,
  speakerCategories,
  sponsorCategories,
  previousSponsorCategories
}) => (
  <React.Fragment>
    {/* {contentControl.tickets.showSection &&
      <Tickets tickets={contentControl.tickets}/>
    } */}
    <Banner
      currentEdition={currentEdition}
      description={contentControl.description}
    />
    <Background>
      {contentControl.showAgenda && agenda.days.length > 0 &&
        <Agenda agenda={agenda}/>
      }
      {contentControl.showSpeakers && speakerCategories.length > 0 &&
        <Speakers speakerCategories={speakerCategories}/>
      }
      {contentControl.showSponsors &&
        <Sponsors id="partners" sponsorCategories={sponsorCategories} title="Partners"/>
      }
      {contentControl.showPreviousSponsors &&
        <Sponsors
          id="previous-partners"
          sponsorCategories={previousSponsorCategories}
          title="Previous Partners"
        />
      }
    </Background>
  </React.Fragment>
);

export default Home;

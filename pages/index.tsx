import React from 'react';
import styled from 'react-emotion';
import withDefault, { DefaultProps } from './_app';
import { Banner, colors, Agenda } from 'p20-components';
import { AgendaType } from 'p20-components/types/Agenda';
import {
  SpeakerCategory,
  Speaker as SpeakerModel,
  SponsorCategory as SponsorCategoryModel,
  Sponsor as SponsorModel
} from '../models';
import Tickets from '../components/Tickets';
import Speakers from '../components/Speakers';
import Sponsors from '../components/Sponsors';

interface Props {
  speakerCategories: SpeakerCategories;
  sponsorCategories: SponsorCategories;
  previousSponsorCategories: SponsorCategories;
  agenda: AgendaType;
}

const Background = styled('section')({
  '& > *:nth-child(odd)': {
    backgroundColor: `${colors.lightGray}`
  },
  '& > *:nth-child(even)': {
    backgroundColor: `${colors.white}`
  }
});

type MarkdownDescription = { description: { md: string } };
export type Speaker = (SpeakerModel & MarkdownDescription);
export type SpeakerCategories = (SpeakerCategory & { speakers: Speaker[] })[];
export type Sponsor = (SponsorModel & MarkdownDescription);
export type SponsorCategories = (SponsorCategoryModel & { sponsors: Sponsor[] })[];

class Home extends React.Component<DefaultProps & Props> {
  render() {
    const {
      agenda,
      currentEdition,
      contentControl,
      speakerCategories,
      sponsorCategories,
      previousSponsorCategories
    } = this.props;
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
          {contentControl.showAgenda &&
            <Agenda agenda={agenda}/>
          }
          {contentControl.showSpeakers &&
            <Speakers speakerCategories={speakerCategories}/>
          }
          {contentControl.showSponsors &&
            <Sponsors id="partners" sponsorCategories={sponsorCategories} title="Partners"/>
          }
          {!contentControl.showSponsors && contentControl.showPreviousSponsors &&
            <Sponsors
              id="previous-partners"
              sponsorCategories={previousSponsorCategories}
              title="Previous Partners"
            />
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

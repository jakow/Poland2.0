import styled from '@emotion/styled';
import Head from 'next/dist/next-server/lib/head';
import React, { FunctionComponent } from 'react';
import Container from '../components/atoms/Container';
import { Header1, Header2 } from '../components/atoms/Headers';
import { withBackground } from '../components/hoc';
import PersonCard, { PersonDetails } from '../components/molecules/PersonCard';
import { rhythm } from '../components/typography';
import { breakpointMin, colors } from '../components/variables';
import Speaker from '../types/Speaker';
import SpeakerCategory from '../types/SpeakerCategory';
import { DefaultPageProps } from './_app';

const Wrapper = styled('section')({
  position: 'relative',
  paddingBottom: rhythm(0.5),
  color: `${colors.white}`,
});

const List = styled('ul')({
  display: 'flex',
  width: '100%',
  margin: 0,
  marginBottom: rhythm(1),
  flexWrap: 'wrap',
  li: {
    flexBasis: '100%',
    [breakpointMin(900)]: {
      flexBasis: '50%',
    },
  },
  [PersonDetails as any]: {
    [breakpointMin(570)]: {
      '& > *:nth-child(-n+3)': {
        maxWidth: `calc(100% - ${rhythm(4.33)})`,
      },
    },
  },
});

interface Props {
  speakers: Speaker[];
  speakerCategories: SpeakerCategory[];
  year?: number;
}

const SpeakersPage: FunctionComponent<DefaultPageProps> = ({ currentEdition }) => (
  <Wrapper>
    <Head>
      <title>Speakers - Poland 2.0 Summit</title>
    </Head>
    <Container>
      <Header1 fat>
        {!currentEdition.previousSpeakersYear ? 'Speakers' : `Speakers of ${currentEdition.previousSpeakersYear}`}
      </Header1>
      {currentEdition.speakerCategories && currentEdition.speakerCategories.map((category, categoryIndex) => (
        <React.Fragment key={categoryIndex}>
          <Header2>{category.name}</Header2>
          <List>
            {currentEdition.speakers && currentEdition.speakers
              .filter(speaker => speaker.category && speaker.category === category._id)
              .map((speaker, index) => (
                <PersonCard person={speaker} color={colors.blue.desaturate(0.75)} key={index} />
              ))
            }
          </List>
        </React.Fragment>
      ))}
    </Container>
  </Wrapper>
);

export default withBackground(SpeakersPage, colors.blue.desaturate(0.5));

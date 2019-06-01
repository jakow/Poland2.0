import React from 'react';
import styled from '@emotion/styled';
import { DefaultProps } from './_app';
import { fat, Anchor, bold, stripe, Center } from '@poland20/p20-components';
import { Speaker, TeamMember } from '../components/types';
import { Edition } from '../models';
import { Background } from '.';
import TeamMembers from '../components/TeamMembers';
import { SpeakersFlat } from '../components/Speakers';

const Container = styled('section')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

const YearList = styled('ol')({
  display: 'flex',
  flexDirection: 'row',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  '& > *': {
    marginTop: 0
  }
});

interface Props {
  editions: (Edition & {
    speakers: Speaker[];
    teamMembers: TeamMember[]
  })[];
  years: string[];
}

const PastEditions: React.StatelessComponent<DefaultProps & Props> = ({ editions, years }) => (
  <Container>
    <h1 className={fat}>Past Editions</h1>
    <YearList>
      {years.map((year, index) => <Anchor key={index} href={`#p${year}`}>{year}</Anchor>)}
    </YearList>
    <Background style={{ width: '100%' }}>
      {editions.map((edition, index) => (
        <article key={index}>
          <Center>
            <h2 id={`p${edition.year}`} className={`${bold} ${fat} ${stripe}`}>{edition.name}</h2>
          </Center>
          <SpeakersFlat speakers={edition.speakers} isInSubcategory={true}/>
          <TeamMembers teamMembers={edition.teamMembers} isInSubcategory={true}/>
        </article>
      ))}
    </Background>
  </Container>
);

export default PastEditions;

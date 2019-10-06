import React from 'react';
import styled from '@emotion/styled';
import { withBackground } from '../components/hoc';
import {DefaultPageProps} from './_app';
import Edition from '../types/Edition';

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
  editions: Edition[];
}

const PastEditions: React.StatelessComponent<DefaultPageProps & Props> = ({editions}) => (
  <Container>
    {/* <h1 className={_fat}>Past Editions</h1>
    <YearList>
      {years.map((year, index) => <Anchor key={index} href={`#p${year}`}>{year}</Anchor>)}
    </YearList>
    <Background style={{ width: '100%' }}>
      {editions.map((edition, index) => (
        <article key={index}>
          <Center>
            <h2 id={`p${edition.year}`} className={`${_bold} ${_fat} ${_stripe}`}>
              Poland 2.0 Summit {edition.year}
            </h2>
          </Center>
          <SpeakersFlat speakers={edition.speakers} isInSubcategory={true}/>
          <TeamMembers teamMembers={edition.teamMembers} isInSubcategory={true}/>
        </article>
      ))}
    </Background> */}
  </Container>
);

export default withBackground(PastEditions);

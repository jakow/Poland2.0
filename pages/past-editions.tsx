import { Icon } from '@blueprintjs/core';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import Container from '../components/atoms/Container';
import { Header1, Header3, Header4 } from '../components/atoms/Headers';
import { withBackground } from '../components/hoc';
import { IconLabel, TextWithIcon } from '../components/molecules/TicketTile';
import AgendaEvent from '../components/organisms/Agenda/AgendaEvent';
import { rhythm } from '../components/typography';
import { breakpointMax, breakpointMin, colors } from '../components/variables';
import { api } from '../helpers/misc';
import Edition from '../types/Edition';

const informationWidth = 20.25;
const desktopExcessLeft = '((100vw - 1280px) / 2)';

const Text = styled('article')({
  width: rhythm(informationWidth),
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
  [breakpointMax('tabletLarge')]: {
    width: '100%',
  },
  p: {
    textAlign: 'justify',
  },
  [Header3 as any]: {
    marginBottom: rhythm(0.5),
  },
});

const Information = styled('div')({
  display: 'flex',
});

const Wrapper = styled('section')({
  color: `${colors.white}`,
  paddingTop: rhythm(1),
  [Header1 as any]: {
    position: 'relative',
    zIndex: 2,
  },
});

const CoverPhoto = styled('img')({
  position: 'absolute',
  opacity: 0.5,
  objectFit: 'cover',
  height: `calc(100% + ${rhythm(3.5)})`,
  top: 0,
  margin: 0,
  width: '100%',
  [breakpointMin('tabletLarge')]: {
    opacity: 1,
    left: rhythm(informationWidth + 2),
    width: `calc(100vw - ${rhythm(informationWidth + 3)})`,
  },
  [breakpointMin('desktop')]: {
    width: `calc(100vw - ${rhythm(informationWidth + 3)} - ${desktopExcessLeft})`,
  },
});

const PastEdition = styled('article')({
  minHeight: `calc(100vh - ${rhythm(6.5)})`,
  position: 'relative',
  [`&:first-of-type ${CoverPhoto}`]: {
    top: `-${rhythm(3.5)}`,
  },
  [breakpointMax('tabletLarge')]: {
    [`&:not(:first-of-type) ${Header3}`]: {
      marginTop: rhythm(1),
    },
  },
});

const PastEditionsContainer = styled(Container)({
  [breakpointMax('tabletLarge')]: {
    padding: 0,
    [Information as any]: {
      padding: `0 ${rhythm(1)}`,
    },
    [Header1 as any]: {
      paddingLeft: rhythm(1),
    },
  },
});

interface Props {
  editions: Edition[];
}

const PastEditions: NextPage<Props> = ({ editions }) => (
  <PastEditionsContainer>
    <Wrapper>
      <Head>
        <title>Past Editions - Poland 2.0 Summit</title>
      </Head>
      <Header1>Past Editions</Header1>
      {editions && editions.map((edition, index) => (
        <PastEdition key={index}>
          <Information>
            <Text>
              <Header3 uppercase bodyFont>{edition.year}: {edition.name}</Header3>
              <TextWithIcon style={{ marginBottom: rhythm(1) }}>
                <Icon icon="map-marker" color={`${colors.white}`} iconSize={20} />
                <IconLabel>{edition.venue && edition.venue.name}</IconLabel>
              </TextWithIcon>
              <ReactMarkdown>{edition.description}</ReactMarkdown>
              {(() => {
                if (edition.agendaDays) {
                  const featuredEvents = edition.agendaDays.reduce((events, day) => [
                    ...events,
                    ...day.events.filter(event => event.featured)],
                  []);

                  return featuredEvents.length ? (
                    <>
                      <Header4 bodyFont>
                        Featured Presentations
                      </Header4>
                      {featuredEvents.map((event, eventIndex) => (
                        <AgendaEvent key={eventIndex} cardColor={colors.red.darken(0.05)} compact {...event} />
                      ))}
                    </>
                  ) : null;
                }

                return null;
              })()}
            </Text>
          </Information>
          {edition.coverPhoto && <CoverPhoto src={edition.coverPhoto.url} alt={edition.name} />}
        </PastEdition>
      ))}
    </Wrapper>
  </PastEditionsContainer>
);

PastEditions.getInitialProps = async () => {
  const editions: Edition[] = await api('editions?current=false&_sort=year:desc');
  return { editions };
};

export default withBackground(PastEditions, colors.red);

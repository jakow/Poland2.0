import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import { Icon } from '@blueprintjs/core';
import ReactMarkdown from 'react-markdown';
import Button from '../components/atoms/Button';
import { dateString } from '../helpers/date';
import { DefaultPageProps, api } from './_app';
import Background from '../components/atoms/Background';
import Sponsors from '../components/organisms/Sponsors';
import TicketAlert from '../components/organisms/TicketAlert';
import Sponsor from '../types/Sponsor';
import { breakpointMax, colors } from '../components/variables';
import { dangerousSuperscripts, rhythm } from '../components/typography';
import { navHeight } from '../components/organisms/TopNavigation';
import { Header1, Header2, Header3 } from '../components/atoms/Headers';
import { IconLabel, TextWithIcon } from '../components/molecules/TicketTile';

const CoverMedia = styled('div')({
  marginBottom: `calc(100vh - ${rhythm(19.75)} - ${navHeight})`,
  'h1, h2, h3, h4': {
    position: 'relative',
    zIndex: 1,
    marginBottom: rhythm(0.5),
  },
  'video, img': {
    width: '100%',
    opacity: 0.55,
    objectFit: 'cover',
    [breakpointMax('tabletLarge')]: {
      height: `calc(100vh - ${rhythm(16)} - ${navHeight})`,
      position: 'absolute',
      top: navHeight,
      left: 0,
    },
  },
});

const Hero = styled('section')({
  display: 'flex',
  minHeight: `calc(100vh - ${navHeight})`,
  backgroundColor: `${colors.red}`,
  padding: `0 ${rhythm(1)}`,
  paddingTop: rhythm(1),
  color: `${colors.white}`,
  [breakpointMax('tabletLarge')]: {
    flexDirection: 'column',
  },
  p: {
    textAlign: 'justify',
  },
  button: {
    marginTop: 'auto',
    marginBottom: rhythm(1),
  },
});

interface Props {
  previousSponsors: Sponsor[];
}

export default class extends React.Component<DefaultPageProps & Props> {
  static async getInitialProps() {
    const previousSponsors = await api('previousSponsors');
    return { previousSponsors };
  }

  render() {
    const { contentControl, currentEdition, previousSponsors } = this.props;
    return (
      <React.Fragment>
        <Head>
          <script src="/static/mc.js" />
        </Head>
        {contentControl.ticketControl.description
        && <TicketAlert ticketControl={contentControl.ticketControl} />
        }
        <Hero>
          <CoverMedia>
            <Header1>Poland 2.0 Summit</Header1>
            {currentEdition.name
            && <Header3 uppercase bodyFont dangerouslySetInnerHTML={dangerousSuperscripts(currentEdition.name)} />
            }
            {currentEdition.coverPhoto && currentEdition.coverPhoto.url.endsWith('.mp4') ? (
              <video autoPlay loop muted playsInline>
                <source
                  src={`${currentEdition.coverPhoto.url.slice(0, -4)}.webm`}
                  type="video/webm"
                />
                <source
                  src={currentEdition.coverPhoto.url}
                  type="video/mp4"
                />
              </video>
            ) : (
              <img src={currentEdition.coverPhoto.url} alt="Graphical cover of this year's edition" />
            )}
          </CoverMedia>
          <ReactMarkdown>{currentEdition.description || ''}</ReactMarkdown>
          <TextWithIcon>
            <Icon icon="map-marker" color={`${colors.white}`} iconSize={20} />
            <IconLabel>{currentEdition.venue && currentEdition.venue.name}</IconLabel>
          </TextWithIcon>
          <TextWithIcon>
            <Icon icon="calendar" color={`${colors.white}`} iconSize={20} />
            <IconLabel>
              <time dateTime={currentEdition.startDate}>
                {dateString(currentEdition.startDate, currentEdition.endDate)}
              </time>
            </IconLabel>
          </TextWithIcon>
          <br />
          <Button uppercase wide>Get Tickets</Button>
        </Hero>
        <Background>
          {contentControl.showPreviousSponsors
          && (
            <Sponsors
              title="Previous Partners"
              sponsors={previousSponsors}
            />
          )}
        </Background>
      </React.Fragment>
    );
  }
}

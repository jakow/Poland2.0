import Link from 'next/link';
import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import { Icon } from '@blueprintjs/core';
import ReactMarkdown from 'react-markdown';
import Button from '../components/atoms/Button';
import Container from '../components/atoms/Container';
import { withBackground } from '../components/hoc';
import Card, { CardList } from '../components/molecules/Card';
import { limit } from '../helpers/cloudinary';
import { dateString } from '../helpers/date';
import { api } from '../helpers/misc';
import { DefaultPageProps } from './_app';
import Background from '../components/atoms/Background';
import Sponsors from '../components/organisms/Sponsors';
import Sponsor from '../types/Sponsor';
import { breakpointMax, breakpointMin, colors } from '../components/variables';
import { Center, dangerousSuperscripts, rhythm } from '../components/typography';
import { navHeight } from '../components/organisms/TopNavigation';
import { Header1, Header2, Header3 } from '../components/atoms/Headers';
import { IconLabel, TextWithIcon } from '../components/molecules/TicketTile';
import { PartnersWrapper } from './partners';

const informationWidth = 14;
const desktopExcessLeft = '((100vw - 1280px) / 2)';

const Information = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  [breakpointMin('tabletLarge')]: {
    width: rhythm(informationWidth),
    minHeight: `calc(100vh - ${navHeight} - ${rhythm(1)})`,
  },
  [breakpointMin('desktop')]: {
    paddingLeft: `calc(${desktopExcessLeft})`,
    width: `calc(${rhythm(informationWidth)} + ${desktopExcessLeft})`,
  },
});

const Headers = styled('div')({
  marginBottom: `calc(100vh - ${rhythm(19.75)} - ${navHeight})`,
  [breakpointMin('tabletLarge')]: {
    marginBottom: rhythm(1),
  },
  'h1, h2, h3, h4': {
    position: 'relative',
    zIndex: 1,
    marginBottom: rhythm(0.5),
  },
});

const Hero = styled('section')({
  display: 'flex',
  backgroundColor: `${colors.red}`,
  padding: `0 ${rhythm(1)}`,
  paddingTop: rhythm(1),
  color: `${colors.white}`,
  'p:first-of-type': {
    textAlign: 'justify',
    [breakpointMin('tabletLarge')]: {
      marginBottom: 'auto',
    },
  },
  button: {
    margin: `${rhythm(1)} 0`,
  },
  [breakpointMax('tabletLarge')]: {
    flexDirection: 'column',
  },
  'video, img': {
    width: '100%',
    opacity: 0.55,
    objectFit: 'cover',
    height: `calc(100vh - ${rhythm(16)} - ${navHeight})`,
    position: 'absolute',
    top: navHeight,
    left: 0,
    [breakpointMin('tabletLarge')]: {
      height: `calc(100vh - ${navHeight})`,
      left: rhythm(informationWidth + 3),
      width: `calc(100% - ${rhythm(informationWidth + 3)})`,
    },
    [breakpointMin('desktop')]: {
      left: `calc(${rhythm(informationWidth + 3)} + ${desktopExcessLeft})`,
      width: `calc(100% - ${rhythm(informationWidth + 3)} - ${desktopExcessLeft})`,
    },
  },
});

interface Props {
  previousSponsors: Sponsor[];
}

class Home extends React.Component<DefaultPageProps & Props> {
  static async getInitialProps() {
    const previousSponsors = await api('previousSponsors');
    return { previousSponsors };
  }

  render() {
    const {
      contentControl, currentEdition, previousSponsors,
    } = this.props;

    return (
      <React.Fragment>
        <Head>
          <script src="/static/mc.js" />
        </Head>
        <Hero>
          <Information>
            <Headers>
              <Header1>Poland 2.0 Summit</Header1>
              {currentEdition.name
                && <Header3 uppercase bodyFont dangerouslySetInnerHTML={dangerousSuperscripts(currentEdition.name)} />
              }
            </Headers>
            <ReactMarkdown>{currentEdition.description}</ReactMarkdown>
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
            {contentControl.ticketControl.onSale ? (
              <Link href="/tickets">
                <Button uppercase wide>Get Tickets</Button>
              </Link>
            ) : null}
          </Information>
          {currentEdition.coverPhoto && currentEdition.coverPhoto.url.endsWith('.mp4') ? (
            <video autoPlay loop muted playsInline poster={`${currentEdition.coverPhoto.url.slice(0, -4)}.jpg`}>
              <source src={`${currentEdition.coverPhoto.url.slice(0, -4)}.webm`} type="video/webm" />
              <source src={currentEdition.coverPhoto.url} type="video/mp4" />
            </video>
          ) : (
            <img src={currentEdition.coverPhoto.url} alt="Graphical cover of this year's edition" />
          )}
        </Hero>
        {contentControl.showPreviousSponsors && previousSponsors && (
          <PartnersWrapper>
            <Container>
              <Header1 fat>Previous Partners</Header1>
              <CardList style={{ justifyContent: 'flex-start' }}>
                {previousSponsors.map((sponsor, index) => (
                  <Card
                    key={index}
                    image={limit(sponsor.logo.url, 300)}
                    imagePreview={limit(sponsor.logo.url, 32)}
                    href={sponsor.url}
                    footer={sponsor.name}
                    width={rhythm(7.85)}
                  />
                ))}
              </CardList>
              <br />
              <Center>
                Would your organisation like to join this list? <a href="mailto:contact@poland20.com">Contact us!</a>
              </Center>
            </Container>
          </PartnersWrapper>
        )}
      </React.Fragment>
    );
  }
}

export default withBackground(Home, colors.red);

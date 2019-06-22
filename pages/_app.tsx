import React from 'react';
import App, { Container, NextAppContext } from 'next/app';
import Link from 'next/link';
import getConfig from 'next/config';
import Footer from '../components/Footer';
import { Global, css } from '@emotion/core';
import { TypographyStyle, GoogleFont } from 'react-typography';
import Head from 'next/head';
import typography, { rhythm } from '../components/typography';
import TopNavigation from '../components/TopNavigation';
import ContentControl from '../types/ContentControl';
import Edition from '../types/Edition';

const { publicRuntimeConfig } = getConfig();

export const api = (path: string) =>
  fetch(`${publicRuntimeConfig.host}/${path}`).then(data => data.json());

export interface DefaultPageProps {
  contentControl: ContentControl;
  currentEdition: Edition;
}

export default class Website extends App<DefaultPageProps> {
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const currentEdition: Edition = await api('currentEdition');
    const contentControl: ContentControl = await api('contentControl');

    if (!currentEdition.agendaDays.length || !currentEdition.sponsors.length) {
      const year = currentEdition.year - 1;
      const previousEdition: Edition = await api(`editions/${year}`);
      if (!currentEdition.agendaDays.length) {
        currentEdition.previousAgendaYear = year;
        currentEdition.agendaDays = previousEdition.agendaDays;
        currentEdition.speakers = previousEdition.speakers;
        currentEdition.speakerCategories = previousEdition.speakerCategories;
      }
      if (!currentEdition.sponsors.length) {
        currentEdition.previousSponsorsYear = year;
        currentEdition.sponsors = previousEdition.sponsors;
        currentEdition.sponsorCategories = previousEdition.sponsorCategories;
      }
    }

    return { currentEdition, contentControl, pageProps };
  }

  render() {
    const { Component, contentControl, currentEdition, pageProps } = this.props;
    const navLinks = [
      { title: 'About', url: '/about' },
      contentControl.showAgenda && { title: 'Agenda', url: '/#agenda' },
      contentControl.showSpeakers && { title: 'Speakers', url: '/#speakers' },
      contentControl.showSponsors && { title: 'Partners', url: '/#partners' },
      { title: 'empowerPL', url: '/empowerPL' },
      // { title: 'Past Editions', url: '/past-editions' },
    ];

    return (
      <Container>
        <Global
          styles={css({
            '@media screen and (max-width: 320px)': { // iPhone 5/SE
              body: {
                fontSize: 14
              }
            },
            '@media screen and (max-width: 414px)': { // iPhone 6/7/8 Plus
              body: {
                fontSize: 15
              }
            },
            'a[id]': {
              position: 'absolute',
              top: `-${rhythm(3)}`
            }
          })}
        />
        <TypographyStyle typography={typography}/>
        <GoogleFont typography={typography}/>
        <Head>
          <title>Poland 2.0 Summit</title>
        </Head>
        <TopNavigation items={navLinks} Router={Link}/>
        <main style={{ marginTop: rhythm(3) }}>
          <Component
            contentControl={contentControl}
            currentEdition={currentEdition}
            {...pageProps}
          />
        </main>
        <Footer {...contentControl}/>
      </Container>
    );
  }
}

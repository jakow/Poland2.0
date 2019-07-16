import React from 'react';
import App, { Container, AppContext } from 'next/app';
import getConfig from 'next/config';
import Footer from '../components/organisms/Footer';
import { Global, css } from '@emotion/core';
import { TypographyStyle, GoogleFont } from 'react-typography';
import Head from 'next/head';
import typography, { rhythm, globalStyle } from '../components/typography';
import TopNavigation from '../components/organisms/TopNavigation';
import ContentControl from '../types/ContentControl';
import Edition from '../types/Edition';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export const api = async (path: string) => {
  const host = serverRuntimeConfig.host || publicRuntimeConfig.host;
  const data = await fetch(`${host}/${path}`);
  return await data.json();
};

export interface DefaultPageProps {
  contentControl: ContentControl;
  currentEdition: Edition;
}

export default class Website extends App<DefaultPageProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
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
      ...(contentControl.showAgenda ? [{ title: 'Agenda', url: '/agenda' }] : []),
      ...(contentControl.showSpeakers ? [{ title: 'Speakers', url: '/speakers' }] : []),
      ...(contentControl.showSponsors ? [{ title: 'Partners', url: '/partners' }] : []),
      // { title: 'Past Editions', url: '/past-editions' },
      { title: 'empowerPL', url: '/empowerPL' }
    ];

    return (
      <Container>
        <TypographyStyle typography={typography}/>
        <GoogleFont typography={typography}/>
        <Global styles={globalStyle}/>
        <Head>
          <title>Poland 2.0 Summit</title>
        </Head>
        <TopNavigation items={navLinks}/>
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

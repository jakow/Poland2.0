import { Global } from '@emotion/core';
import App, { AppContext } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { GoogleFont, TypographyStyle } from 'react-typography';
import Footer from '../components/organisms/Footer';
import TopNavigation, { MenuItem, navHeight } from '../components/organisms/TopNavigation';
import typography, { globalStyle } from '../components/typography';
import { api } from '../helpers/misc';
import ContentControl from '../types/ContentControl';
import Edition from '../types/Edition';

export interface DefaultPageProps {
  contentControl: ContentControl;
  currentEdition: Edition;
}

export default class extends App<DefaultPageProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const currentEdition: Edition = await api('editions/current');
    const contentControl: ContentControl = await api('contentControl');

    if (!currentEdition.agendaDays.length
        || !currentEdition.speakers.length
        || !currentEdition.speakerCategories.length
        || !currentEdition.sponsors.length
    ) {
      const year = currentEdition.year - 1;
      const previousEdition: Edition = await api(`editions/${year}`);
      if (!currentEdition.agendaDays.length) {
        currentEdition.previousAgendaYear = year;
        currentEdition.agendaDays = previousEdition.agendaDays;
      }
      if (!currentEdition.speakers.length || !currentEdition.speakerCategories.length) {
        currentEdition.previousSpeakersYear = year;
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
    const {
      Component, contentControl, currentEdition, pageProps,
    } = this.props;
    const navLinks: MenuItem[] = [
      { title: 'About', url: '/about' },
      ...(contentControl.showAgenda ? [{ title: 'Agenda', url: '/agenda' }] : []),
      ...(contentControl.showSpeakers ? [{ title: 'Speakers', url: '/speakers' }] : []),
      ...(contentControl.showSponsors ? [{ title: 'Partners', url: '/partners' }] : []),
      // { title: 'Past Editions', url: '/past-editions' },
      { title: 'EmpowerPL', url: '/empowerPL' },
      ...(contentControl.ticketControl.onSale
        ? [{ title: 'Get Tickets', url: '/tickets', type: 'button' } as MenuItem]
        : []
      ),
    ];

    return (
      <React.Fragment>
        <TypographyStyle typography={typography} />
        <GoogleFont typography={typography} />
        <Global styles={globalStyle} />
        <Head>
          <title>Poland 2.0 Summit</title>
        </Head>
        <TopNavigation items={navLinks} />
        <main style={{ marginTop: navHeight }}>
          <Component
            contentControl={contentControl}
            currentEdition={currentEdition}
            {...pageProps}
          />
        </main>
        <Footer {...contentControl} />
      </React.Fragment>
    );
  }
}

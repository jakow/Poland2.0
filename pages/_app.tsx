import React from 'react';
import App, { Container, NextAppContext } from 'next/app';
import Link from 'next/link';
import getConfig from 'next/config';
import { TopNavigation, rhythm, typography } from '@poland20/p20-components';
import { NavItem } from '../routes/middleware';
import Footer from '../components/Footer';
import { ContentControl, Edition } from '../models';
import { Global, css } from '@emotion/core';
import { TypographyStyle, GoogleFont } from 'react-typography';
import Head from 'next/head';

const { publicRuntimeConfig } = getConfig();

export interface DefaultProps {
  contentControl?: ContentControl & { privacyPolicy: { md: string } };
  currentEdition?: Edition;
}

export default class Website extends App<DefaultProps> {
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const currentEdition = await fetch(`${publicRuntimeConfig.host}/currentEdition`)
                                .then(data => data.json());
    const contentControl = await fetch(`${publicRuntimeConfig.host}/contentControl`)
                                .then(data => data.json());

    return { currentEdition, contentControl, pageProps };
  }

  render() {
    const { Component, contentControl, currentEdition, pageProps } = this.props;
    const navLinks: NavItem[] = [
      { title: 'About', url: '/about' },
      { title: 'Past Editions', url: '/past-editions' },
      { title: 'empowerPL', url: '/empowerPL' }
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
        <Footer
          bylawUrl={contentControl.bylawUrl}
          privacyPolicy={contentControl.privacyPolicy}
          facebookUrl={contentControl.facebookUrl}
          linkedinUrl={contentControl.linkedinUrl}
          twitterUrl={contentControl.twitterUrl}
          videoChannelUrl={contentControl.videoChannelUrl}
        />
      </Container>
    );
  }
}

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
import { Head } from 'next/document';

const { publicRuntimeConfig } = getConfig();

export interface DefaultProps {
  contentControl?: ContentControl & { privacyPolicy: { md: string } };
  currentEdition?: Edition;
  navLinks?: NavItem[];
}

export default class Website extends App<DefaultProps> {
  static async getInitialProps({ Component }: NextAppContext) {
    const middleware = await fetch(`${publicRuntimeConfig.host}/middleware`)
                            .then(data => data.json());
    const view = Component.displayName.toLowerCase();
    const pageProps = await fetch(`${publicRuntimeConfig.host}/views/${view}`)
                            .then(data => data.json());

    return { ...middleware, pageProps };
  }

  render() {
    const { Component, contentControl, currentEdition, navLinks, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>Poland 2.0 Summit</title>
        </Head>
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
        <TopNavigation items={navLinks} Router={Link}/>
        <main style={{ marginTop: rhythm(3) }}>
          <Component
            contentControl={contentControl}
            currentEdition={currentEdition}
            {...pageProps}
          />
        </main>
        <Footer
          bylawLink={contentControl.bylawLink}
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

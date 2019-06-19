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

    const currentEdition = await fetch(`${publicRuntimeConfig.host}/currentEdition`)
                                .then(data => data.json());
    const contentControl = await fetch(`${publicRuntimeConfig.host}/contentControl`)
                                .then(data => data.json());

    return { currentEdition, contentControl, pageProps };
  }

  render() {
    const { Component, contentControl, currentEdition, pageProps } = this.props;
    const navLinks = [
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
        <Footer {...contentControl}/>
      </Container>
    );
  }
}

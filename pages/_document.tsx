import 'isomorphic-fetch';
import * as React from 'react';
import { TypographyStyle, GoogleFont } from 'react-typography';
import Document, { Head, Main, NextScript, DocumentProps } from 'next/document';
import { extractCritical } from 'emotion-server';
import { typography } from '@poland20/p20-components';

export default class extends Document {
  constructor (props: DocumentProps) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  static async getInitialProps({ renderPage }: any) {
    const page = renderPage();
    const styles = extractCritical(page.html);
    return { ...page, ...styles };
  }

  render() {
    return (
      <html lang="en-GB">
        <Head> {/* tslint:disable */}
          <meta charSet="utf-8"/>
          <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
          <meta name="description" content="Annual Polish student conference held at Imperial College London, tackling entrepreneurship, innovation and change across industries."/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

          <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/static/images/favicons/apple-touch-icon-57x57.png"/>
          <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/static/images/favicons/apple-touch-icon-114x114.png"/>
          <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/static/images/favicons/apple-touch-icon-72x72.png"/>
          <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/static/images/favicons/apple-touch-icon-144x144.png"/>
          <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/static/images/favicons/apple-touch-icon-120x120.png"/>
          <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/static/images/favicons/apple-touch-icon-152x152.png"/>
          <link rel="icon" type="image/png" href="/static/images/favicons/favicon-32x32.png" sizes="32x32"/>
          <link rel="icon" type="image/png" href="/static/images/favicons/favicon-16x16.png" sizes="16x16"/>
          <link rel="mask-icon" href="/static/images/favicons/mask-icon.svg" color="#C53D56"/>
          <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.3.5/css/swiper.min.css"/>

          <meta name="application-name" content="Poland 2.0"/>
          <meta name="msapplication-TileColor" content="#FFFFFF"/>
          <meta name="msapplication-TileImage" content="/static/images/favicons/mstile-144x144.png"/>
          {/* tslint:enable */}

          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />

          <title>Poland 2.0 Summit</title>
        </Head>
        <body>
          <noscript>
            This site requires JavaScript for best user experience.
            Because you have disabled JavaScript, your experience may be limited.
          </noscript>
          <TypographyStyle typography={typography} />
          <GoogleFont typography={typography} />
          <Main/>
          <NextScript/>
        </body>
      </html>
    );
  }

}

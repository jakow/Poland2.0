import * as React from 'react';
import { TypographyStyle, GoogleFont } from 'react-typography';
import Document, { Head, Main, NextScript, RenderPageResponse } from 'next/document';
import { typography } from 'p20-components';

export default class extends Document {
  static getInitialProps({ renderPage }: { renderPage: () => RenderPageResponse }) {
    const { html, head, errorHtml, chunks } = renderPage();
    return { html, head, errorHtml, chunks };
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
          <meta name="application-name" content="Poland 2.0"/>
          <meta name="msapplication-TileColor" content="#FFFFFF"/>
          <meta name="msapplication-TileImage" content="/static/images/favicons/mstile-144x144.png"/>
          {/* tslint:enable */}

          <title>Poland 2.0 Summit</title>
        </Head>
        <body>
          <TypographyStyle typography={typography} />
          <GoogleFont typography={typography} />
          <Main/>
          <NextScript/>
        </body>
      </html>
    );
  }

}

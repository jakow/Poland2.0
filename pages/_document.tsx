import 'isomorphic-unfetch';
import Document, {
  Head, Main, NextScript, Html,
} from 'next/document';

export default class extends Document {
  render() {
    return (
      <Html lang="en-GB">
        <Head>
          {/* eslint-disable */}
          <meta charSet="utf-8"/>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="description" content="Annual Polish student conference, tackling entrepreneurship, innovation and change across industries." />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

          <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/static/images/favicons/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/static/images/favicons/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/static/images/favicons/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/static/images/favicons/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/static/images/favicons/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/static/images/favicons/apple-touch-icon-152x152.png" />
          <link rel="icon" type="image/png" href="/static/images/favicons/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/static/images/favicons/favicon-16x16.png" sizes="16x16" />
          <link rel="mask-icon" href="/static/images/favicons/mask-icon.svg" color="#C63D57" />
          <meta name="application-name" content="Poland 2.0 Summit" />
          <meta name="msapplication-TileColor" content="#F5F5F5" />
          <meta name="msapplication-TileImage" content="/static/images/favicons/mstile-144x144.png" />

          <link href="/static/style.css" rel="stylesheet" />
          <link rel="stylesheet" href="/static/fonts/league-spartan.css" />

          <script src="https://js.stripe.com/v3/" />
          <script
            src="https://downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js"
            data-dojo-config="usePlainJson: true, isDebug: false"
          />
          <script src="/static/gtag.js" />
          <script async src="https://www.google-analytics.com/analytics.js" />
          <script async src="/static/autotrack.js" />
          <script src="/static/fb.js" />

          {/* eslint-enable */}
        </Head>
        <body>
          <noscript>
            This site requires JavaScript for best user experience.
            Because you have disabled JavaScript, your experience may be limited.
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

}

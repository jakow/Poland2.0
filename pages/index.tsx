import React from 'react';
import Head from 'next/head';
import { DefaultPageProps, api } from './_app';
import Background from '../components/atoms/Background';
import Sponsors from '../components/organisms/Sponsors';
import Banner from '../components/organisms/Banner';
import TicketAlert from '../components/organisms/TicketAlert';
import Sponsor from '../types/Sponsor';

interface Props {
  previousSponsors: Sponsor[];
}

export default class extends React.Component<DefaultPageProps & Props> {
  static async getInitialProps() {
    const previousSponsors = await api('previousSponsors');
    return { previousSponsors };
  }

  render() {
    const { contentControl, currentEdition, previousSponsors } = this.props;
    return (
      <React.Fragment>
        <Head>
          {/* Mailchimp */}
          <script
            src="https://downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js"
            data-dojo-config="usePlainJson: true, isDebug: false"
          />
          <script src="/static/mc.js" />
        </Head>
        {contentControl.ticketControl.description
          && <TicketAlert ticketControl={contentControl.ticketControl} />
        }
        <Banner currentEdition={currentEdition} />
        <Background>
          {contentControl.showPreviousSponsors
          && (
            <Sponsors
              title="Previous Partners"
              sponsors={previousSponsors}
            />
          )}
        </Background>
      </React.Fragment>
    );
  }
}

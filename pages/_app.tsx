import React from 'react';
import { TopNavigation, rhythm } from 'p20-components';
import { NavItem } from '../routes/middleware';
import Footer from '../components/Footer';
import { ContentControl, Edition } from '../models';

export interface DefaultProps {
  contentControl?: ContentControl;
  currentEdition?: Edition;
  navLinks?: NavItem[];
}

const withDefault = (Page: React.ComponentType<DefaultProps>) =>
  (class extends React.Component<DefaultProps> {
    static async getInitialProps() {
      const middleware = await fetch('http://localhost:9009/middleware')
        .then(data => data.json());
      return { ...middleware };
    }

    render = () => (
      <React.Fragment>
        <TopNavigation items={this.props.navLinks}/>
        <main style={{ marginTop: rhythm(3) }}>
          <Page
            contentControl={this.props.contentControl}
            currentEdition={this.props.currentEdition}
          />
        </main>
        <Footer
          bylawLink={this.props.contentControl.bylawLink}
          facebookUrl={this.props.contentControl.facebookUrl}
          linkedinUrl={this.props.contentControl.linkedinUrl}
          twitterUrl={this.props.contentControl.twitterUrl}
          videoChannelUrl={this.props.contentControl.videoChannelUrl}
        />
      </React.Fragment>
    )
  }
);

export default withDefault;

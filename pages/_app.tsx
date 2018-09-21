import React from 'react';
import { TopNavigation, rhythm } from 'p20-components';
import { NavItem } from '../routes/middleware';
import Footer from '../components/Footer';
import { ContentControl, Edition } from '../models';
import { injectGlobal } from 'emotion';

export interface DefaultProps {
  contentControl?: ContentControl;
  currentEdition?: Edition;
  navLinks?: NavItem[];
  viewData?: any;
}

injectGlobal({
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
});

const withDefault = (Page: React.ComponentType<DefaultProps>, view: string) =>
  (class extends React.Component<DefaultProps> {
    static async getInitialProps() {
      const middleware = await fetch('http://localhost:9009/middleware')
        .then(data => data.json());
      const viewData = await fetch(`http://localhost:9009/views/${view}`)
        .then(data => data.json());
      return { ...middleware, viewData };
    }

    render = () => (
      <React.Fragment>
        <TopNavigation items={this.props.navLinks}/>
        <main style={{ marginTop: rhythm(3) }}>
          <Page
            contentControl={this.props.contentControl}
            currentEdition={this.props.currentEdition}
            {...this.props.viewData}
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

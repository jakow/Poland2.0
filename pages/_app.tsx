import React from 'react';
import { Container, TopNavigation, rhythm } from 'p20-components';
import { NavItem } from '../routes/middleware';
import Footer from '../components/Footer';
import { ContentControl, Edition } from '../models';

interface Props {
  contentControl?: ContentControl;
  currentEdition?: Edition;
  navLinks?: NavItem[];
}

const withDefault = (Page: React.ComponentType) => (class extends React.Component<Props> {
  static async getInitialProps() {
    const middleware = await fetch('http://localhost:9009/middleware')
      .then(data => data.json());
    return { ...middleware };
  }

  render = () => (
    <React.Fragment>
      <TopNavigation items={this.props.navLinks}/>
      <Container style={{ marginTop: rhythm(3) }}>
        <Page/>
      </Container>
      <Footer
        bylawLink={this.props.contentControl.bylawLink}
        facebookUrl={this.props.contentControl.facebookUrl}
        linkedinUrl={this.props.contentControl.linkedinUrl}
        twitterUrl={this.props.contentControl.twitterUrl}
        videoChannelUrl={this.props.contentControl.videoChannelUrl}
      />
    </React.Fragment>
  )
});

export default withDefault;

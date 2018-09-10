import * as React from 'react';
import 'p20-components/bundle.css';
import { Container, TopNavigation, rhythm } from 'p20-components';
import { NavItem } from '../routes/middleware';

class App extends React.Component<{ navLinks: NavItem[] }> {
  static async getInitialProps() {
    const navLinks = await fetch('http://localhost:9009/middleware/getNavLinks');
    const json = await navLinks.json();
    return { ...json };
  }

  render = () => (
    <React.Fragment>
      <TopNavigation items={this.props.navLinks}/>
      <Container style={{ marginTop: rhythm(3) }}>
        Hello World
      </Container>
    </React.Fragment>
  )
};

export default App;

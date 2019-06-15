import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Loader from 'components/Loader';

class LoadingApp extends React.Component {
  state = {
    loaded: false
  };

  componentDidMount() {
    setTimeout(() => this.setState({ loaded: true }), 3000);
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.loaded && <Loader/>}
        Hello World
      </React.Fragment>
    );
  }
}

storiesOf('Loader', module)
  .add('default view', () => (
    <LoadingApp/>)
  );

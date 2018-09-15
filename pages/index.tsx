import React from 'react';
import withDefault, { DefaultProps } from './_app';
import { Banner } from 'p20-components';

class Home extends React.Component<DefaultProps> {
  render = () => (
    <React.Fragment>
      <Banner
        currentEdition={this.props.currentEdition}
        description={this.props.contentControl.description}
      />
    </React.Fragment>
  )
}

export default withDefault(Home);

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ResponsiveVideo from '../components/ResponsiveVideo';

storiesOf('ResponsiveVideo', module)
  .add('default view', () => (
    // tslint:disable
    <React.Fragment>
      <ResponsiveVideo src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FPoland20Summit%2Fvideos%2F1148441771907974%2F&show_text=0"/>
      <ResponsiveVideo src="https://player.vimeo.com/video/249003931"/>
    </React.Fragment>
    // tslint:enable
  ));

import * as React from 'react';
import { TypographyStyle, GoogleFont } from 'react-typography';
import { addDecorator, configure } from '@storybook/react';
import typography from '../components/typography';

import '../static/linear-icons-1.0.0.min.css';
import 'react-id-swiper/src/styles/css/swiper.css';

addDecorator(story => (
  <React.Fragment>
    <TypographyStyle typography={typography} />
    <GoogleFont typography={typography} />
    {story()}
  </React.Fragment>
));

const req = require.context('../stories', true, /\.stories\.tsx?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

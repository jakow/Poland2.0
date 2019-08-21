import * as React from 'react';
import { TypographyStyle, GoogleFont } from 'react-typography';
import { addDecorator, configure } from '@storybook/react';
import typography, { globalStyle } from '../components/typography';

import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import { Global } from '@emotion/core';

addDecorator(story => (
  <React.Fragment>
    <TypographyStyle typography={typography} />
    <GoogleFont typography={typography} />
    <Global styles={globalStyle}/>
    {story()}
  </React.Fragment>
));

const req = require.context('../stories', true, /\.stories\.tsx?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

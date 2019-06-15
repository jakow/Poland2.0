import * as React from 'react';
import { storiesOf } from '@storybook/react';
import AnimatedLogo from 'components/AnimatedLogo';

storiesOf('AnimatedLogo', module)
  .add('default view', () => (
    <AnimatedLogo/>)
  );

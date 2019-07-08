import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Countdown from '../components/molecules/Countdown';

storiesOf('Countdown', module)
  .add('default view', () => (
    <Countdown date={new Date('2019-10-25')} />)
  );

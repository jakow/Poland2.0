import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button, NavButton } from '../components/atoms/Button';

storiesOf('Button', module)
  .add('default view', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('hollow', () => (
    <Button hollow={true} onClick={action('clicked')}>Hollow Button</Button>
  ))
  .add('NavButton', () => (
    <NavButton href="https://google.com" target="_blank">Go to Google</NavButton>
  ));

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Spinner from 'components/Spinner';

storiesOf('Spinner', module)
  // set position to 'relative' to override 'absolute'
  .add('default view', () => (<Spinner style={{ position: 'relative' }}/>));

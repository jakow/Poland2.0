import * as React from 'react';
import { storiesOf } from '@storybook/react';
import LazyImage from '../components/atoms/LazyImage';
import { action } from '@storybook/addon-actions';

storiesOf('LazyImage', module)
  // set position to 'relative' to override 'absolute'
  .add('default view', () => {
    const log = action('Visible');
    const loading = 'http://via.placeholder.com/400?text=Loading...';

    return (
      <div style={{ paddingTop: '100vh' }}>
        <LazyImage
          src="http://via.placeholder.com/400?text=A"
          placeholder={loading}
          onRender={log}
          throttle={3000}
        />
        <br/>
        <LazyImage
          src="http://via.placeholder.com/400?text=B"
          placeholder={loading}
          onRender={log}
          throttle={1000}
        />
        <br/>
        <LazyImage
          src="http://via.placeholder.com/400?text=C"
          placeholder={loading}
          onRender={log}
          throttle={2000}
        />
      </div>
    );
  });

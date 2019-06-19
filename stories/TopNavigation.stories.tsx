import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TopNavigation, { MenuItem } from '../components/TopNavigation';

storiesOf('TopNavigation', module)
  .add('basic', () => {
    const items: MenuItem[] = [
      { title: 'About', url: '', active: true },
      { title: 'empowerPL', url: '', active: false },
      { title: 'Past Events', url: '', active: false },
      { title: 'Volunteering', url: '', active: false },
      { title: 'Tickets', url: '', type: 'button' }
    ];

    return (
      <React.Fragment>
        <TopNavigation items={items}/>
        <div style={{ height: '150vh' }}/>
      </React.Fragment>
    );
  });

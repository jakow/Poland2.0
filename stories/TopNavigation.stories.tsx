import React from 'react';
import { storiesOf } from '@storybook/react';
import TopNavigation, { MenuItem } from '../components/organisms/TopNavigation';

storiesOf('TopNavigation', module)
  .add('basic', () => {
    const items: MenuItem[] = [
      { title: 'About', url: '#' },
      { title: 'Agenda', url: '#' },
      { title: 'Speakers', url: '#' },
      { title: 'Partners', url: '#' },
      { title: 'Past Editions', url: '#' },
      { title: 'EmpowerPL', url: '#' },
      { title: 'Get Tickets', url: '', type: 'button' },
    ];

    return (
      <React.Fragment>
        <TopNavigation items={items} />
      </React.Fragment>
    );
  });

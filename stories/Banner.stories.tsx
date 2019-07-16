import React from 'react';
import { storiesOf } from '@storybook/react';
import Banner from '../components/organisms/Banner';
import Edition from '../types/Edition';
import TopNavigation, { MenuItem } from '../components/organisms/TopNavigation';
import { rhythm } from '../components/typography';

storiesOf('Banner', module)
  .add('default view', () => {
    // tslint:disable
    const edition: Edition = {
      name: '21st Century Nomad',
      startDate: '2019-10-25',
      endDate: '2019-10-26',
      venue: {
        name: 'Imperial College London'
      },
      description: 'Et eaque ad animi veniam provident est quisquam. Quis repellat nemo debitis quo nesciunt nulla. Porro repellat ratione porro eos quibusdam quia consequuntur. Illo quibusdam tempora odio ut.\n\nImpedit hic amet sit fugit veritatis ipsam. Consequuntur qui quidem omnis. Est rerum qui est. Animi enim pariatur doloremque exercitationem voluptatum voluptatem est. Delectus illo nemo qui.',
      coverPhoto: { url: 'https://res.cloudinary.com/dg1royeho/video/upload/v1563304043/cover_lwyzwb.mp4' }
    };
    // tslint:enable

    return (
      <React.Fragment>
        <TopNavigation items={[]}/>
        <div style={{ height: rhythm(3) }}/>
        <Banner currentEdition={edition}/>
      </React.Fragment>
    );
  });

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Banner from '../components/Banner';
import Edition from '../types/Edition';

storiesOf('Banner', module)
  .add('default view', () => {
    // tslint:disable
    const edition: Edition = {
      startDate: '2019-10-25',
      endDate: '2019-10-26',
      venue: {
        name: 'Imperial College London'
      },
      description: 'Et eaque ad animi veniam provident est quisquam. Quis repellat nemo debitis quo nesciunt nulla. Porro repellat ratione porro eos quibusdam quia consequuntur. Illo quibusdam tempora odio ut. Impedit hic amet sit fugit veritatis ipsam. Consequuntur qui quidem omnis. Est rerum qui est. Animi enim pariatur doloremque exercitationem voluptatum voluptatem est. Delectus illo nemo qui.'
    };
    // tslint:enable

    return <Banner currentEdition={edition}/>;
  });

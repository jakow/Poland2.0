import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Banner from 'components/Banner';
import { Edition } from 'types/Edition';

storiesOf('Banner', module)
  .add('default view', () => {
    // tslint:disable
    const edition: Edition = {
      isoString: '2018-11-23/2018-11-24',
      dateString: '23–24 November, 2018',
      venue: {
        name: 'Imperial College London'
      },
      photos: [
        { secure_url: 'nt9wsxyxdslsbgi6j19s' },
        { secure_url: 'i6jwnsajcihb2trnjpdv' },
        { secure_url: 'hrp5koxx3lo8pca8vfyp' },
        { secure_url: 'kvklnbfvy9ktokfx2ha2' }
      ]
    };
    const description = 'Et eaque ad animi veniam provident est quisquam. Quis repellat nemo debitis quo nesciunt nulla. Porro repellat ratione porro eos quibusdam quia consequuntur. Illo quibusdam tempora odio ut. Impedit hic amet sit fugit veritatis ipsam. Consequuntur qui quidem omnis. Est rerum qui est. Animi enim pariatur doloremque exercitationem voluptatum voluptatem est. Delectus illo nemo qui.'
    // tslint:enable

    return <Banner currentEdition={edition} description={description}/>;
  });

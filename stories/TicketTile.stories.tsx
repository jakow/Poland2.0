import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TicketTile from '../components/molecules/TicketTile';
import { CardList } from '../components/molecules/Card';

// tslint:disable
const text = 'Qui dolorum dolore illum eos laudantium nobis. Et hic similique numquam voluptatem aut inventore maiores. Harum impedit qui nulla eos aut natus.';
const text2 = 'Qui dolorum dolore illum eos laudantium nobis. Et hic similique numquam voluptatem aut inventore maiores.';
// tslint:enable

storiesOf('TicketTile', module)
  .add('basic', () => (
    <TicketTile
      name="Early Bird Conference (Student)"
      description={text}
      price={39.99}
      quantity={30}
      soldRecently={5}
      // tslint:disable
      benefits={'Access to exclusive workshops organised by top companies\nFull day of engaging, fascinating panels and keynotes\nChance to have lunch with one of the speakers'}
      // tslint:enable
    />
  ));

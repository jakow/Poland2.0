import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TicketTile from '../components/molecules/TicketTile';
import { CardList } from '../components/molecules/Card';

// tslint:disable
const text = 'Qui dolorum dolore illum eos laudantium nobis. Et hic similique numquam voluptatem aut inventore maiores. Harum impedit qui nulla eos aut natus.';
const benefits = 'Access to exclusive workshops organised by top companies\nFull day of engaging, fascinating panels and keynotes\nChance to have lunch with one of the speakers';
// tslint:enable

storiesOf('TicketTile', module)
  .add('basic', () => (
    <TicketTile
      id="as424ewewqe"
      name="Early Bird Conference (Student)"
      description={text}
      price={39.99}
      quantity={30}
      soldRecently={5}
      benefits={benefits}
    />
  ))
  .add('low quantity', () => (
    <TicketTile
      id="as424ewewqe"
      name="Early Bird Conference (Student)"
      description={text}
      price={49.99}
      quantity={5}
      warningLimit={7}
      soldRecently={3}
      benefits={benefits}
    />
  ))
  .add('sold out', () => (
    <TicketTile
      id="as424ewewqe"
      name="Early Bird Conference (Student)"
      description={text}
      price={59.99}
      quantity={0}
      warningLimit={7}
      benefits={benefits}
    />
  ));

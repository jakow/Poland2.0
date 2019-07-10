import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TicketTile from '../components/molecules/TicketTile';
import { CardList } from '../components/molecules/Card';

// tslint:disable
const text = 'Qui dolorum dolore illum eos laudantium nobis. Et hic similique numquam voluptatem aut inventore maiores. Harum impedit qui nulla eos aut natus.';
const benefits = 'Access to exclusive workshops organised by top companies\nFull day of engaging, fascinating panels and keynotes\nChance to have lunch with one of the speakers';
// tslint:enable

export const ticketTypes = [
  {
    benefits,
    id: 'teser3w2',
    name: 'Early Bird Conference (Student)',
    description: text,
    price: 39.99,
    quantity: 30,
    soldRecently: 5,
    warningLimit: 7
  },
  {
    benefits,
    id: 'j6544ete',
    name: 'Early Bird Deluxe (Student)',
    description: text,
    price: 49.99,
    quantity: 6,
    soldRecently: 10,
    warningLimit: 7
  }
];

storiesOf('TicketTile', module)
  .add('basic', () => (
    <TicketTile {...ticketTypes[0]}/>
  ))
  .add('low quantity', () => (
    <TicketTile {...ticketTypes[1]}/>
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
  ))
  .add('list', () => (
    <CardList>
      <TicketTile
        id="as424ewewqe"
        name="Early Bird Conference (Student)"
        description={text}
        price={59.99}
        quantity={1}
        soldRecently={10}
        warningLimit={7}
        benefits={benefits}
      />
      <TicketTile
        id="as424ewewqe"
        name="Early Bird Conference (Student)"
        description={text}
        price={59.99}
        quantity={8}
        warningLimit={7}
        benefits={benefits}
      />
      <TicketTile
        id="as424ewewqe"
        name="Early Bird Conference (Student)"
        description={text}
        price={59.99}
        quantity={20}
        warningLimit={7}
        benefits={benefits}
      />
      <TicketTile
        id="as424ewewqe"
        name="Early Bird Conference (Student)"
        description={text}
        price={59.99}
        quantity={30}
        warningLimit={7}
        benefits={benefits}
      />
      <TicketTile
        id="as424ewewqe"
        name="Early Bird Conference (Student)"
        description={text}
        price={59.99}
        quantity={50}
        warningLimit={7}
        benefits={benefits}
      />
    </CardList>
  ));

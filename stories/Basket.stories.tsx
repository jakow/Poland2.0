import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Basket from '../components/organisms/Basket';
import { ticketTypes } from './TicketTile.stories';
import TicketTile from '../components/molecules/TicketTile';

storiesOf('Basket', module)
  .add('basic', () => {
    localStorage.removeItem('basket');
    return (
      <React.Fragment>
        <Basket ticketTypes={ticketTypes}/>
        <TicketTile {...ticketTypes[0]}/>
        <TicketTile {...ticketTypes[1]}/>
      </React.Fragment>
    );
  });

import React, { useEffect, useState, FunctionComponent } from 'react';
import Card from '../../molecules/Card';
import { Header2 } from '../../atoms/Headers';
import styled from '@emotion/styled';
import TicketType from '../../../types/TicketType';
import { Center, rhythm } from '../../typography';
import { Icon } from '@blueprintjs/core';
import { colors } from '../../variables';
import Button from '../../atoms/Button';
import { basketEffect, getBasket, getTotalAmount, BasketProps } from './logic';
import { toGBP } from '../../../helpers/currency';

const Wrapper = styled('section')({
  table: {
    marginBottom: rhythm(0.5)
  },
  'th, td': {
    border: 0
  }
});

const Checkout = () => {
  return (
    <Button wide>Checkout</Button>
  );
};

const Basket: FunctionComponent<BasketProps> = ({ ticketTypes }) => {
  const [basket, setBasket] = useState(getBasket());
  useEffect(basketEffect(setBasket));

  return (
    <Card width={rhythm(14)}>
      <a id="basket"/>
      <Wrapper>
        <Header2 bold noMargin>Basket</Header2>
        {Object.entries(basket).length > 0
        ? <table>
            <thead>
              <tr>
                <th>Qty</th>
                <th>Ticket</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {ticketTypes.map((ticketType, index) => (
                basket[ticketType.id] > 0 ? (
                  <tr key={index}>
                    <td><Center>{basket[ticketType.id]}</Center></td>
                    <td>{ticketType.name}</td>
                    <td><Center>{toGBP(basket[ticketType.id] * ticketType.price)}</Center></td>
                  </tr>
                ) : null
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={2}>Total Amount</th>
                <td>
                  {getTotalAmount(ticketTypes, basket)}
                </td>
              </tr>
            </tfoot>
          </table>
        : <React.Fragment>
            <br/>
            <Center>
              Your basket is empty!<br/>
              Use&nbsp;&nbsp;
              <Icon icon="add" color={`${colors.dark}`} iconSize={18}/>&nbsp;
              to add tickets to the basket.
            </Center>
          </React.Fragment>
        }
        {Object.entries(basket).length > 0 ? <Checkout/> : null}
      </Wrapper>
    </Card>
  );
};

export default Basket;

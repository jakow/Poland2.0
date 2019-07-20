import React from 'react';
import TicketType from '../../../types/TicketType';
import { toGBP } from '../../../helpers/currency';

export interface BasketProps {
  ticketTypes: TicketType[];
}

export const getBasket = () => JSON.parse(localStorage.getItem('basket') || '{}');

export const getTotalAmount = (ticketTypes: TicketType[], basket: any) => {
  const sum = ticketTypes.reduce(
    (sum, ticketType) =>
      basket[ticketType.id]
      ? sum + basket[ticketType.id] * ticketType.price
      : sum,
    0
  );

  return toGBP(sum);
};

export const basketEffect = (setBasket: React.Dispatch<any>) => () => {
  const handleBasketChange = () => {
    const storage = JSON.parse(localStorage.getItem('basket') || '{}');
    setBasket(storage);
  };

  addEventListener('storage', handleBasketChange);

  return () => removeEventListener('storage', handleBasketChange);
};

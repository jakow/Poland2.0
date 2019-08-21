import React from 'react';
import TicketType from '../../../types/TicketType';
import { toGBP } from '../../../helpers/currency';

export const getBasket = (ticketTypes?: TicketType[]) => {
  const storage = localStorage.getItem('basket');
  if (!storage) {
    return {};
  }

  const basket = JSON.parse(storage);
  if (!ticketTypes) {
    return basket;
  }

  ticketTypes.forEach((ticketType) => {
    if ((basket[ticketType.id] && !ticketType.active) || (basket[ticketType.id] > ticketType.quantity)) {
      delete basket[ticketType.id];
    }
  });

  localStorage.setItem('basket', JSON.stringify(basket));

  return basket;
};

export const getTotalAmount = (ticketTypes: TicketType[], basket: any) => ticketTypes.reduce(
  (sum, ticketType) => (basket[ticketType.id]
    ? sum + basket[ticketType.id] * ticketType.price
    : sum
  ), 0,
);

export const getFormattedTotalAmount = (ticketTypes: TicketType[], basket: any) => (
  toGBP(getTotalAmount(ticketTypes, basket))
);

export const basketEffect = (setBasket: React.Dispatch<any>) => () => {
  const handleBasketChange = () => {
    const storage = JSON.parse(localStorage.getItem('basket') || '{}');
    setBasket(storage);
  };

  window.addEventListener('storage', handleBasketChange);

  return () => window.removeEventListener('storage', handleBasketChange);
};

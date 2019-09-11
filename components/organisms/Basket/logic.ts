import React from 'react';
import TicketType from '../../../types/TicketType';
import Coupon from '../../../types/Coupon';
import { toGBP } from '../../../helpers/currency';

export const getCoupon = () => JSON.parse(localStorage.getItem('coupon'));

export const getBasket = (ticketTypes?: TicketType[]) => {
  const storage = localStorage.getItem('basket');
  if (!storage) {
    return {};
  }

  const basket = JSON.parse(storage);
  if (!ticketTypes) {
    return basket;
  }

  Object.entries(basket).forEach(([id, quantity]) => {
    const ticketType = ticketTypes.find(_ticketType => _ticketType.id === id);
    if (!ticketType || !ticketType.active || (quantity > ticketType.quantity)) {
      delete basket[id];
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

export const getFormattedTotalAmount = (ticketTypes: TicketType[], basket: any, coupon: Coupon) => {
  if (!coupon) {
    return toGBP(getTotalAmount(ticketTypes, basket));
  }

  if (coupon.type === 'discountFixed') {
    const amount = Math.max(getTotalAmount(ticketTypes, basket) - coupon.value, 1);
    return toGBP(amount);
  }

  if (coupon.type === 'discountPercentage') {
    const amount = Math.max(getTotalAmount(ticketTypes, basket) * (1 - coupon.value / 100), 1);
    return toGBP(amount);
  }

  return toGBP(getTotalAmount(ticketTypes, basket));
};

export const basketEffect = (setBasket: React.Dispatch<any>, setCoupon: React.Dispatch<any>) => () => {
  const handleBasketChange = () => {
    const storage = JSON.parse(localStorage.getItem('basket') || '{}');
    setBasket(storage);
    setCoupon(getCoupon());
  };

  window.addEventListener('storage', handleBasketChange);

  return () => window.removeEventListener('storage', handleBasketChange);
};

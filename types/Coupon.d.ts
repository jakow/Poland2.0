import TicketType from './TicketType';

type Coupon = {
  code: string,
  type: 'discountFixed' | 'discountPercentage' | 'ticketAccess',
  value: number;
  basketCondition: TicketType[];
};

export default Coupon;

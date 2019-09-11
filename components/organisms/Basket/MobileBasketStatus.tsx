import { useEffect, useState, FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { breakpointMax, colors } from '../../variables';
import { Flex } from '../../molecules/TicketTile';
import { Header3 } from '../../atoms/Headers';
import { rhythm } from '../../typography';
import {
  getBasket, basketEffect, getFormattedTotalAmount, getCoupon,
} from './logic';
import TicketType from '../../../types/TicketType';

const Wrapper = styled('a')({
  display: 'none',
  [breakpointMax('tablet')]: {
    display: 'block',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100vw',
    backgroundColor: `${colors.red}`,
    color: `${colors.white}`,
    textDecoration: 'none',
    padding: `${rhythm(0.5)} 0`,
    b: {
      textAlign: 'center',
      transform: 'translateX(6%)',
      flex: 2,
    },
    h3: {
      width: rhythm(3.25),
      textAlign: 'right',
      marginRight: rhythm(1),
    },
  },
});

interface Props {
  ticketTypes: TicketType[];
}

const MobileBasketStatus: FunctionComponent<Props> = ({ ticketTypes }) => {
  const [basket, setBasket] = useState(getBasket());
  const [coupon, setCoupon] = useState(getCoupon());
  useEffect(basketEffect(setBasket, setCoupon));

  return Object.entries(basket).length > 0
    ? (
      <Wrapper href="#basket">
        <Flex>
          <b>Go to Basket</b>
          <Header3 bold noMargin>{getFormattedTotalAmount(ticketTypes, basket, coupon)}</Header3>
        </Flex>
      </Wrapper>
    ) : null;
};

export default MobileBasketStatus;

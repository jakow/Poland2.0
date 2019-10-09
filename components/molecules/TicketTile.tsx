import { useState, useEffect, FunctionComponent } from 'react';
import Markdown from 'react-markdown';
import { Icon } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { TicketControl } from '../../types/ContentControl';
import Card from './Card';
import { Header3 } from '../atoms/Headers';
import { rhythm } from '../typography';
import { colors } from '../variables';
import TicketType from '../../types/TicketType';
import { toGBP } from '../../helpers/currency';

const Wrapper = styled('section')({
  '& > h3': {
    marginBottom: rhythm(0.5),
  },
  p: {
    marginBottom: rhythm(0.5),
  },
});

export const TextWithIcon = styled('p')({
  display: 'flex',
  marginBottom: rhythm(0.25),
});

const flex = css({
  display: 'flex',
  alignItems: 'center',
});

export const Flex = styled('section')(flex, {
  justifyContent: 'space-between',
  userSelect: 'none',
  '.bp3-icon': {
    height: '20px',
  },
});

const Status = styled('h4')(flex, {
  justifyContent: 'flex-start',
});

const margin = css({
  margin: `0 ${rhythm(0.5)}`,
});

export const IconLabel = styled('span')(margin);

const Quantity = styled('b')(margin, {
  paddingTop: 2,
  width: rhythm(1),
});

const getBasket = (id: string) => {
  const storage = JSON.parse(localStorage.getItem('basket'));
  if (!storage || !storage[id]) {
    return 0;
  }

  return storage[id];
};

const Footer = ({ id, price, quantity }) => {
  const [basketItem, setBasketItem] = useState(getBasket(id));
  useEffect(
    () => {
      let storage = JSON.parse(localStorage.getItem('basket'));
      if (!storage) {
        storage = {};
      }

      if (basketItem > 0) {
        storage[id] = basketItem;
      } else {
        delete storage[id];
      }

      localStorage.setItem('basket', JSON.stringify(storage));
      dispatchEvent(new Event('storage'));
    },
  );
  return (
    <Flex>
      <Header3 bold noMargin>{toGBP(price)}</Header3>
      {quantity > 0
        ? (
          <Flex>
            <Icon
              icon="remove"
              color={`${basketItem > 0 ? colors.dark : colors.gray}`}
              iconSize={20}
              onClick={() => basketItem > 0 && setBasketItem(basketItem - 1)}
              style={{ cursor: basketItem > 0 ? 'pointer' : 'auto' }}
            />
            <Quantity>{basketItem}</Quantity>
            <Icon
              icon="add"
              color={`${basketItem < quantity ? colors.dark : colors.gray}`}
              iconSize={20}
              onClick={() => basketItem < quantity && setBasketItem(basketItem + 1)}
              style={{ cursor: basketItem < quantity ? 'pointer' : 'auto' }}
            />
          </Flex>
        ) : <Header3 noMargin>Sold out!</Header3>
      }
    </Flex>
  );
};

const TicketTile: FunctionComponent<TicketType & { ticketControl: TicketControl }> = ({
  id, name, description, quantity, warningLimit, soldRecently, price, benefits, ticketControl,
}) => (
  <Card width={rhythm(15)} footer={<Footer id={id} price={price} quantity={quantity} />}>
    <Wrapper>
      <Header3 bold>{name}</Header3>
      {description && <Markdown>{description}</Markdown>}
      {benefits && benefits.split('\n').map((benefit, index) => (
        <TextWithIcon key={index}>
          <Icon icon="tick-circle" color={`${colors.dark}`} iconSize={20} />
          <IconLabel>{benefit}</IconLabel>
        </TextWithIcon>
      ))}
      {quantity > 0
        && (
          <Status>
            {quantity <= warningLimit
              && (
              <Icon
                icon="warning-sign"
                color={`${colors.dark}`}
                iconSize={22}
                style={{ marginRight: rhythm(0.5), marginBottom: rhythm(0.2) }}
              />
              )
            }
            <span>
              {ticketControl.showTicketsRemaining && (!warningLimit || (quantity > warningLimit)) && (
                <span><b>{quantity}</b> tickets remaining.&nbsp;</span>
              )}
              {quantity <= warningLimit && (
                <span>
                  Only <b>{quantity}</b> {quantity !== 1 ? 'tickets' : 'ticket'} remaining!&nbsp;
                </span>
              )}
              {soldRecently && <span><u>{soldRecently} sold</u> in the past 24 hours!</span>}
            </span>
          </Status>
        )
      }
    </Wrapper>
  </Card>
);

export default TicketTile;

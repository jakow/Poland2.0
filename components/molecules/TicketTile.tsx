import { NextFC } from 'next';
import Card from './Card';
import Markdown from 'react-markdown';
import { Icon } from '@blueprintjs/core';
import { Header3, Header2, Header4 } from '../atoms/Headers';
import styled from '@emotion/styled';
import { rhythm } from '../typography';
import { colors } from '../variables';
import { css } from '@emotion/core';
import { useState, useEffect } from 'react';
import TicketType from '../../types/TicketType';

const Wrapper = styled('section')({
  '& > h3': {
    marginBottom: rhythm(0.5)
  },
  p: {
    marginBottom: rhythm(0.5)
  }
});

const Benefit = styled('p')({
  display: 'flex',
  marginBottom: rhythm(0.25),
  '.bp3-icon': {
    marginTop: '2px'
  }
});

const flex = css({
  display: 'flex',
  alignItems: 'center'
});

export const Flex = styled('section')(flex, {
  justifyContent: 'space-between',
  userSelect: 'none',
  '.bp3-icon': {
    height: '20px'
  }
});

const Status = styled('small')(flex, {
  justifyContent: 'flex-start'
});

const margin = css({
  margin: `0 ${rhythm(0.5)}`
});

const IconLabel = styled('span')(margin);

const Quantity = styled('b')(margin, {
  paddingTop: '2px',
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
  const [basket, setBasket] = useState(getBasket(id));
  useEffect(
    () => {
      let storage = JSON.parse(localStorage.getItem('basket'));
      if (!storage) {
        storage = {};
      }

      if (basket > 0) {
        storage[id] = basket;
      } else {
        delete storage[id];
      }

      localStorage.setItem('basket', JSON.stringify(storage));
      dispatchEvent(new Event('storage'));
    },
    [basket]
  );
  return (
    <Flex>
      <Header3 bold noMargin>£{price}</Header3>
      {quantity > 0
      ? <Flex>
          <Icon
            icon="remove"
            color={`${basket > 0 ? colors.dark : colors.mediumGray}`}
            iconSize={20}
            onClick={() => basket > 0 && setBasket(basket - 1)}
            style={{ cursor: basket > 0 ? 'pointer' : 'auto' }}
          />
          <Quantity>{basket}</Quantity>
          <Icon
            icon="add"
            color={`${basket < quantity ? colors.dark : colors.mediumGray}`}
            iconSize={20}
            onClick={() => basket < quantity && setBasket(basket + 1)}
            style={{ cursor: basket < quantity ? 'pointer' : 'auto' }}
          />
        </Flex>
      : <Header3 noMargin>Sold out!</Header3>
      }
    </Flex>
  );
};

const TicketTile: NextFC<TicketType> = ({
  id, name, description, quantity, warningLimit, soldRecently, price, benefits
}) => (
  <Card footer={<Footer id={id} price={price} quantity={quantity}/>}>
    <Wrapper>
      <Header3 bold>{name}</Header3>
      {description && <Markdown>{description}</Markdown>}
      {benefits && benefits.split('\n').map((benefit, index) => (
        <Benefit key={index}>
          <Icon icon="tick-circle" color={`${colors.dark}`} iconSize={20}/>
          <IconLabel>{benefit}</IconLabel>
        </Benefit>
      ))}
      {quantity > 0 &&
        <Status>
          {quantity <= warningLimit &&
            <Icon
              icon="warning-sign"
              color={`${colors.dark}`}
              iconSize={22}
              style={{ marginRight: rhythm(0.5), marginBottom: rhythm(0.2) }}
            />
          }
          <span>
            {!warningLimit || quantity > warningLimit
            ? <span><b>{quantity}</b> tickets remaining.&nbsp;</span>
            : <span>
                Only <b>{quantity}</b> {quantity !== 1 ? 'tickets' : 'ticket'} remaining!&nbsp;
              </span>
            }
            {soldRecently &&
              <span>
                <u>{soldRecently} sold</u> in the past 24 hours!
              </span>
            }
          </span>
        </Status>
      }
    </Wrapper>
  </Card>
);

export default TicketTile;

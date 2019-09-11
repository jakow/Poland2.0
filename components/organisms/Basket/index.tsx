import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Icon } from '@blueprintjs/core';
import Link from 'next/link';
import Card from '../../molecules/Card';
import { Header2 } from '../../atoms/Headers';
import TicketType from '../../../types/TicketType';
import { Center, rhythm } from '../../typography';
import { colors } from '../../variables';
import Button from '../../atoms/Button';
import {
  basketEffect, getBasket, getFormattedTotalAmount, getCoupon, getTotalAmount,
} from './logic';
import { toGBP } from '../../../helpers/currency';

const Wrapper = styled('section')({
  table: {
    marginBottom: rhythm(0.5),
  },
  'th, td': {
    border: 0,
  },
  '.bp3-icon': {
    userSelect: 'none',
    cursor: 'pointer',
  },
  button: {
    minHeight: rhythm(2),
  },
});

export interface SubmitButtonProps {
  href?: string;
  label: string;
  form?: string;
  ref?: React.MutableRefObject<Button>;
}

const Submission = React.forwardRef<Button, SubmitButtonProps>(
  ({ href, label, form }, ref) => {
    const button = (
      <Button wide ref={ref} form={form} type={form ? 'submit' : 'button'}>
        {label}
      </Button>
    );

    return href ? <Link href={href}>{button}</Link> : button;
  },
);

interface Props {
  ticketTypes: TicketType[];
  submitButton?: SubmitButtonProps;
  width?: string;
  refresh?: boolean;
  onRender?: () => void;
}

const Basket: React.FunctionComponent<Props> = ({
  ticketTypes, submitButton, width, refresh, onRender,
}) => {
  const [basket, setBasket] = useState(getBasket(ticketTypes));
  const [coupon, setCoupon] = useState(getCoupon());
  useEffect(refresh === false ? () => {} : basketEffect(setBasket, setCoupon));

  if (onRender) {
    onRender();
  }

  return (
    <Card width={width || rhythm(15)} id="basket">
      <Wrapper>
        <Header2 bold noMargin>Basket</Header2>
        {Object.entries(basket).length > 0
          ? (
            <table>
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
                      <td>{toGBP(basket[ticketType.id] * ticketType.price)}</td>
                    </tr>
                  ) : null
                ))}
              </tbody>
              <tfoot>
                {coupon ? (
                  <tr>
                    <th colSpan={2}>
                      {coupon.code}
                      {coupon.type === 'discountPercentage' && ` (-${coupon.value}%)`}
                      {refresh !== false && (
                        <Icon
                          icon="delete"
                          color={`${colors.dark}`}
                          iconSize={20}
                          style={{ paddingLeft: rhythm(0.5) }}
                          onClick={() => {
                            localStorage.removeItem('coupon');
                            dispatchEvent(new Event('storage'));
                          }}
                        />
                      )}
                    </th>
                    <td>
                      {coupon.type === 'discountFixed' && `(${toGBP(coupon.value)})`}
                      {coupon.type === 'discountPercentage'
                        && `(${toGBP(getTotalAmount(ticketTypes, basket) * (coupon.value / 100))})`
                      }
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <th colSpan={2}>Total Amount</th>
                  <td>
                    {getFormattedTotalAmount(ticketTypes, basket, coupon)}
                  </td>
                </tr>
              </tfoot>
            </table>
          )
          : (
            <React.Fragment>
              <br />
              <Center>
                Your basket is empty!<br />
                Use&nbsp;&nbsp;
                <Icon icon="add" color={`${colors.dark}`} iconSize={18} />&nbsp;
                to add tickets to the basket.
              </Center>
            </React.Fragment>
          )
        }
        {submitButton && Object.entries(basket).length > 0
          ? <Submission {...submitButton} />
          : null
        }
      </Wrapper>
    </Card>
  );
};

export default Basket;

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
import { basketEffect, getBasket, getFormattedTotalAmount } from './logic';
import { toGBP } from '../../../helpers/currency';

const Wrapper = styled('section')({
  table: {
    marginBottom: rhythm(0.5),
  },
  'th, td': {
    border: 0,
  },
});

export interface SubmitButtonProps {
  href?: string;
  label: string;
  form?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

const Submission = React.forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ href, label, form }, ref) => {
    const button = (
      <Button
        wide
        ref={ref}
        form={form}
        type={form ? 'submit' : 'button'}
      >
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
}

const Basket: React.FunctionComponent<Props> = ({ ticketTypes, submitButton, width }) => {
  const [basket, setBasket] = useState(getBasket(ticketTypes));
  useEffect(basketEffect(setBasket));

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
                <tr>
                  <th colSpan={2}>Total Amount</th>
                  <td>
                    {getFormattedTotalAmount(ticketTypes, basket)}
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

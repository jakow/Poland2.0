import React, { FunctionComponent } from 'react';
import { StripeProvider, CardElement, Elements, injectStripe } from 'react-stripe-elements';
import { Header2 } from '../atoms/Headers';
import { colors } from '../variables';
import styled from '@emotion/styled-base';
import { rhythm } from '../typography';
import TicketType from '../../types/TicketType';
import { getBasket, getTotalAmount } from './Basket/logic';

const style = {
  base: {
    iconColor: `${colors.dark}`,
    color: `${colors.dark}`,
    fontSize: '16px',
    fontFamily: 'monospace',
    '::placeholder': {
      color: `${colors.darkGray}`
    }
  },
  invalid: {
    iconColor: `${colors.red}`,
    color: `${colors.red}`,
  }
};

const Wrapper = styled('form')({
  'input, textarea, .StripeElement': {
    color: `${colors.dark}`,
    width: '100%',
    fontSize: '16px',
    fontFamily: 'monospace',
    display: 'block',
    marginBottom: rhythm(0.75),
    padding: rhythm(0.25),
    paddingLeft: rhythm(0.5),
    boxShadow: '0 1px 8px 0 rgba(0, 0, 0, 0.16)',
    border: 'none',
    outline: 'none',
    resize: 'none',
    background: `${colors.white}`,
    '&::placeholder': {
      color: 'currentColor'
    }
  }
});

const Form = injectStripe(() => (
  <Wrapper id="payment">
    <CardElement style={style}/>
    <input name="owner" type="text" placeholder="Name and Surname" required/>
    <textarea name="address" rows={3} placeholder={'Street\nCity\nCounty'} required/>
    <input name="country" type="text" placeholder="Country" required/>
  </Wrapper>
));

interface Props {
  apiKey: string;
  host: string;
  ticketTypes: TicketType[];
}

class Payment extends React.Component<Props> {
  state = {
    clientSecret: null,
    basket: getBasket()
  };

  async componentDidMount() {
    if (!this.state.clientSecret) {
      const data = await fetch(`${this.props.host}/orders/intent`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          amount: getTotalAmount(this.props.ticketTypes, this.state.basket)
        })
      });

      const { clientSecret } = await data.json();
      if (clientSecret) {
        this.setState({ clientSecret });
      } else {
        throw 'Could not get PaymentIntent';
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header2 bold>Payment</Header2>
        <p>
          Please enter your debit or credit card information below.&nbsp;
          <em>All fields are mandatory</em>.
        </p>
        <StripeProvider apiKey={this.props.apiKey}>
          <Elements locale="en-GB">
            <Form/>
          </Elements>
        </StripeProvider>
        <small>All information entered is processed and stored securely by Stripe.</small>
      </React.Fragment>
    );
  }
}

export default Payment;

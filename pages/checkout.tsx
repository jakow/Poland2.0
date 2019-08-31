import React, { useReducer, useRef } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import styled from '@emotion/styled';
import { Icon } from '@blueprintjs/core';
import Background from '../components/atoms/Background';
import { Center, rhythm } from '../components/typography';
import { Header1, Header2 } from '../components/atoms/Headers';
import { api } from './_app';
import { BasketWrapper } from './tickets';
import { breakpointMax, breakpointMin, colors } from '../components/variables';
import Card, { CardList } from '../components/molecules/Card';
import TicketType from '../types/TicketType';
import Container from '../components/atoms/Container';

interface Props {
  ticketTypes: TicketType[];
}

export interface SubmitButtonRefProps {
  submitButtonRef: React.RefObject<HTMLButtonElement>;
}

enum CheckoutStep {
  PARTICIPANTS = 0,
  PAYMENT = 1,
  DONE = 2
}

const submitButtons: SubmitButton[] = [
  {
    label: 'Continue',
    form: 'participants',
  },
  {
    label: 'Pay with Stripe',
    form: 'payment',
  },
];

const DynamicBasket = dynamic(
  () => import('../components/organisms/Basket'),
  { ssr: false },
);

// STEP 1: Get participant details
const DynamicParticipants = dynamic(
  () => import('../components/organisms/Participants'),
  { ssr: false },
);

// STEP 2: Make payment
const DynamicPayment = dynamic(
  () => import('../components/organisms/Payment'),
  { ssr: false },
);

const Wrapper = styled('main')({
  display: 'flex',
  minHeight: `calc(100vh - ${rhythm(21)})`,
  [breakpointMax('tablet')]: {
    flexDirection: 'column',
  },
  '& > ol': {
    [breakpointMax('tablet')]: {
      padding: '0 1rem',
    },
    [breakpointMin('tablet')]: {
      justifyContent: 'flex-end',
      paddingLeft: rhythm(2),
      width: `calc(100vw - ${rhythm(17.5)})`,
    },
    [breakpointMin('desktopWide')]: {
      justifyContent: 'center',
      paddingLeft: rhythm(3),
      li: {
        maxWidth: 860,
      },
    },
  },
});

interface SubmitButton {
  label: string;
  form: string;
}

export interface CheckoutState {
  participants?: any[];
  survey?: any;
  step?: CheckoutStep;
  submitButton?: SubmitButton;
  clientSecret?: string;
  paymentIntent?: stripe.paymentIntents.PaymentIntent;
}

export type CheckoutAction = {
  type?: CheckoutActionTypes,
} & CheckoutState;

export enum CheckoutActionTypes {
  NEXT,
  PREVIOUS
}

const reducer: React.Reducer<CheckoutState, CheckoutAction> = (state, action) => {
  if (action.type === CheckoutActionTypes.NEXT) {
    window.scrollTo(0, 0);
    return {
      ...state,
      ...action,
      step: state.step + 1,
      submitButton: submitButtons[state.step + 1],
    };
  }

  if (action.type === CheckoutActionTypes.PREVIOUS) {
    window.scrollTo(0, 0);
    return {
      ...state,
      ...action,
      step: state.step - 1,
      submitButton: submitButtons[state.step - 1],
    };
  }

  return {
    ...state,
    ...action,
  };
};

const Checkout: NextPage<Props> = ({ ticketTypes }) => {
  const submitButton = useRef<HTMLButtonElement>();
  const [state, dispatch] = useReducer(reducer, {
    step: CheckoutStep.PARTICIPANTS,
    submitButton: submitButtons[CheckoutStep.PARTICIPANTS],
  });

  return (
    <Background>
      <Head>
        <title>Checkout - Poland 2.0 Summit</title>
      </Head>
      <Center>
        <Header1 fat bold stripe>{state.step !== CheckoutStep.DONE ? 'Checkout' : 'Save the Date'}</Header1>
      </Center>
      <Wrapper>
        {state.step !== CheckoutStep.DONE
          ? (
            <React.Fragment>
              <CardList>
                {state.step === CheckoutStep.PARTICIPANTS
                  && (
                    <Card width="100%">
                      <Header2 bold>Participant Details</Header2>
                      <p>
                        Please enter the following information for each participant&nbsp;
                        <em>underneath their corresponding ticket</em>.<br />
                        Fields marked with&nbsp;
                        <Icon
                          icon="asterisk"
                          color={`${colors.red}`}
                          iconSize={16}
                          style={{ paddingBottom: 1 }}
                        />
                        &nbsp;are mandatory.
                      </p>
                      <DynamicParticipants
                        ticketTypes={ticketTypes}
                        submitButtonRef={submitButton}
                        onSubmit={values => dispatch({
                          type: CheckoutActionTypes.NEXT, participants: values,
                        })}
                      />
                    </Card>
                  )
                }
                {state.step === CheckoutStep.PAYMENT
                  && (
                    <Card width={rhythm(48)}>
                      <DynamicPayment
                        checkoutState={state}
                        checkoutDispatch={dispatch}
                        ticketTypes={ticketTypes}
                        apiKey={process.env.stripeApiKey}
                        submitButtonRef={submitButton}
                      />
                    </Card>
                  )
                }
              </CardList>
              <BasketWrapper>
                <CardList>
                  <DynamicBasket
                    submitButton={{
                      ...state.submitButton,
                      ref: submitButton,
                    }}
                    ticketTypes={ticketTypes}
                  />
                </CardList>
              </BasketWrapper>
            </React.Fragment>
          )
          : (
            <Container style={{ padding: `0 ${rhythm(1.5)}`, textAlign: 'justify' }}>
              <p>Your payment method has been successfully processed!</p>
              <p>
                A receipt for this transaction will be e-mailed to the address specified on the payment page.
              </p>
              <p>
                Ticket confirmation(s) will also arrive via e-mail within the next few minutes. If more than
                one participant was entered, then each participant will receive their corresponding ticket
                confirmation to their e-mail address.
              </p>
              <p>
                <strong>If a ticket confirmation does not arrive,</strong> then remember to check the spam
                folder first!
                Otherwise, <a href="mailto:contact@poland20.com">contact us</a> immediately.
              </p>
              <p>
                Here is a summary of the order:
              </p>
              <CardList>
                <DynamicBasket
                  ticketTypes={ticketTypes}
                  width={rhythm(24)}
                  refresh={false}
                  onRender={() => {
                    localStorage.removeItem('basket');
                  }}
                />
              </CardList>
            </Container>
          )
        }
      </Wrapper>
    </Background>
  );
};

Checkout.getInitialProps = async () => {
  const ticketTypes = await api('tickettypes');
  return { ticketTypes };
};

export default Checkout;

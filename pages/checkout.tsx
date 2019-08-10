import React, { useReducer, useRef } from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import Background from '../components/atoms/Background';
import { Center, rhythm } from '../components/typography';
import { Header1, Header2 } from '../components/atoms/Headers';
import { api } from './_app';
import { BasketWrapper } from './tickets';
import { breakpointMax, breakpointMin } from '../components/variables';
import Card, { CardList } from '../components/molecules/Card';
import TicketType from '../types/TicketType';

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
  // {
  //   label: 'Continue',
  //   form: 'survey',
  // },
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

// STEP 3: Make payment
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
    justifyContent: 'center',
    [breakpointMin('tablet')]: {
      justifyContent: 'flex-end',
      paddingLeft: '2rem',
      width: `calc(100vw - ${rhythm(17.5)})`,
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
      <Center>
        <Header1 fat bold stripe>{state.step !== CheckoutStep.DONE ? 'Checkout' : 'Save the Date!'}</Header1>
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
                        <em>underneath their corresponding ticket</em>.
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
            <div />
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

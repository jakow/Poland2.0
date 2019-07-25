import React, { useState } from 'react';
import { NextPage } from 'next';
import getConfig from 'next/config';
import Background from '../components/atoms/Background';
import { Center, rhythm } from '../components/typography';
import { Header1, Header2 } from '../components/atoms/Headers';
import TicketType from '../types/TicketType';
import { api } from './_app';
import { BasketWrapper } from './tickets';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { breakpointMax, breakpointMin } from '../components/variables';
import Card, { CardList } from '../components/molecules/Card';

const { publicRuntimeConfig } = getConfig();

interface Props {
  ticketTypes: TicketType[];
}

enum CheckoutStep {
  PARTICIPANTS,
  SURVEY,
  PAYMENT
}

const DynamicBasket = dynamic(
  () => import('../components/organisms/Basket'),
  { ssr: false }
);

const DynamicMobileBasketStatus = dynamic(
  () => import('../components/organisms/Basket/MobileBasketStatus'),
  { ssr: false }
);

// STEP 1: Get participant details
const DynamicParticipants = dynamic(
  () => import('../components/organisms/Participants'),
  { ssr: false }
);

// STEP 3: Make payment
const DynamicPayment = dynamic(
  () => import('../components/organisms/Payment'),
  { ssr: false }
);

const Wrapper = styled('main')({
  display: 'flex',
  minHeight: `calc(100vh - ${rhythm(21)})`,
  [breakpointMax('tablet')]: {
    flexDirection: 'column'
  },
  '& > ol': {
    justifyContent: 'center',
    [breakpointMin('tablet')]: {
      justifyContent: 'flex-end',
      paddingLeft: '2rem',
      width: `calc(100vw - ${rhythm(17.5)})`,
    }
  }
});

const buttonRef = React.createRef<HTMLButtonElement>();
const submitButton = {
  label: 'Continue',
  form: 'participants',
  ref: buttonRef
};

const Checkout: NextPage<Props> = ({ ticketTypes }) => {
  const [participants, setParticipants] = useState([]);
  const [checkoutStep, setCheckoutStep] = useState(CheckoutStep.PAYMENT);

  return (
    <Background>
      <Center>
        <Header1 fat bold stripe>Checkout</Header1>
      </Center>
      <Wrapper>
        <CardList>
            {(() => {
              switch (checkoutStep) {
                case CheckoutStep.PARTICIPANTS:
                  return (
                    <Card width="100%">
                      <Header2 bold>Participant Details</Header2>
                      <p>
                        Please enter the following information for each participant&nbsp;
                        <em>underneath their corresponding ticket</em>.
                      </p>
                      <DynamicParticipants
                        ticketTypes={ticketTypes}
                        submitButtonRef={buttonRef}
                        onSubmit={(values) => {
                          setParticipants(values);
                          setCheckoutStep(CheckoutStep.PAYMENT);
                        }}
                      />
                    </Card>
                  );

                case CheckoutStep.PAYMENT:
                  return (
                    <Card width={rhythm(48)}>
                      <DynamicPayment
                        host={publicRuntimeConfig.host}
                        ticketTypes={ticketTypes}
                        apiKey={process.env.stripeApiKey}
                      />
                    </Card>
                  );
              }
            })()}
        </CardList>
        <BasketWrapper>
          <CardList>
            <DynamicBasket
              submitButton={submitButton}
              ticketTypes={ticketTypes}
            />
          </CardList>
        </BasketWrapper>
      </Wrapper>
      {/* <DynamicMobileBasketStatus ticketTypes={ticketTypes}/> */}
    </Background>
  );
};

Checkout.getInitialProps = async () => {
  const ticketTypes = await api('tickettypes');
  return { ticketTypes };
};

export default Checkout;

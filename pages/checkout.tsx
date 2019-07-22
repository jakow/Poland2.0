import React from 'react';
import { NextPage } from 'next';
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

interface Props {
  ticketTypes: TicketType[];
}

const DynamicBasket = dynamic(
  () => import('../components/organisms/Basket'),
  { ssr: false }
);

const DynamicMobileBasketStatus = dynamic(
  () => import('../components/organisms/Basket/MobileBasketStatus'),
  { ssr: false }
);

const DynamicParticipants = dynamic(
  () => import('../components/organisms/Participants'),
  { ssr: false }
);

const Wrapper = styled('main')({
  display: 'flex',
  minHeight: '60vh',
  [breakpointMax('tablet')]: {
    flexDirection: 'column'
  },
  '& > ol': {
    justifyContent: 'center',
    li: {
      [breakpointMax('tablet')]: {
        maxWidth: '90%'
      }
    },
    [breakpointMin('tablet')]: {
      justifyContent: 'flex-start',
      paddingLeft: '2rem',
      width: `calc(100vw - ${rhythm(18)})`,
    },
  }
});

const Checkout: NextPage<Props> = ({ ticketTypes }) => {
  const submitButtonRef = React.createRef<HTMLButtonElement>();
  return (
    <Background>
      <Center>
        <Header1 fat bold stripe>Checkout</Header1>
      </Center>
      <Wrapper>
        <CardList>
          <Card width="100%">
            <Header2 bold>Participant Details</Header2>
            <p>
              Please enter the following information for each participant&nbsp;
              <em>underneath their corresponding ticket</em>.
            </p>
            <DynamicParticipants ticketTypes={ticketTypes} submitButtonRef={submitButtonRef}/>
          </Card>
        </CardList>
        <BasketWrapper>
          <DynamicBasket
            submitButton={{ label: 'Continue', form: 'participants', ref: submitButtonRef }}
            ticketTypes={ticketTypes}
          />
        </BasketWrapper>
      </Wrapper>
      <DynamicMobileBasketStatus ticketTypes={ticketTypes}/>
    </Background>
  );
};

Checkout.getInitialProps = async () => {
  const ticketTypes = await api('tickettypes');
  return { ticketTypes };
};

export default Checkout;

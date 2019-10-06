import React from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { withBackground } from '../components/hoc';
import { api } from '../helpers/misc';
import TicketType from '../types/TicketType';
import Background from '../components/atoms/Background';
import { Header1 } from '../components/atoms/Headers';
import { Center, rhythm } from '../components/typography';
import { CardList } from '../components/molecules/Card';
import { breakpointMax, breakpointMin, colors } from '../components/variables';
import Container from '../components/atoms/Container';

interface Props {
  ticketTypes: TicketType[];
}

export const BasketWrapper = styled('aside')({
  display: 'flex',
  flexDirection: 'column',
  zIndex: 2,
  [breakpointMax('tablet')]: {
    justifyContent: 'center',
    padding: '0 1rem',
    backgroundColor: `${colors.white}`,
    li: {
      maxWidth: '100%',
    },
    ol: {
      width: '100%',
    },
  },
  [breakpointMin('tablet')]: {
    position: 'fixed',
    right: rhythm(1),
    li: {
      margin: 0,
    },
  },
});

const Wrapper = styled('main')({
  display: 'flex',
  minHeight: '50vh',
  [breakpointMax('tablet')]: {
    flexDirection: 'column',
  },
  '& > ol': {
    [breakpointMax('tablet')]: {
      li: {
        maxWidth: 'unset',
      },
      padding: '0 1rem',
    },
    [breakpointMin('tablet')]: {
      paddingLeft: '2rem',
      width: `calc(100vw - ${rhythm(17)})`,
    },
  },
});

const Basket = dynamic(
  () => import('../components/organisms/Basket'),
  { ssr: false },
);

const MobileBasketStatus = dynamic(
  () => import('../components/organisms/Basket/MobileBasketStatus'),
  { ssr: false },
);

const PromotionField = dynamic(
  () => import('../components/molecules/PromotionField'),
  { ssr: false },
);

const TicketTile = dynamic(
  () => import('../components/molecules/TicketTile'),
  { ssr: false },
);

const Tickets: NextPage<Props> = ({ ticketTypes }) => {
  const ticketsAvailable = ticketTypes.length > 0 && ticketTypes.some(ticketType => ticketType.active);
  return (
    <Background>
      <Head>
        <title>Tickets - Poland 2.0 Summit</title>
      </Head>
      <Center>
        <Header1 fat bold>Tickets</Header1>
      </Center>
      <Wrapper>
        {ticketsAvailable ? (
          <React.Fragment>
            <CardList>
              {ticketTypes.map((ticketType, index) => (
                ticketType.active ? (
                  <TicketTile
                    key={index}
                    {...ticketType}
                  />
                ) : null
              ))}
            </CardList>
            <BasketWrapper>
              <PromotionField />
              <CardList>
                <Basket
                  submitButton={{ href: '/checkout', label: 'Checkout' }}
                  ticketTypes={ticketTypes}
                />
              </CardList>
            </BasketWrapper>
            <MobileBasketStatus ticketTypes={ticketTypes} />
          </React.Fragment>
        ) : (
          <Container>
            <Center>
              <p>Tickets are currently unavailable. Please check back in later!</p>
            </Center>
          </Container>
        )}
      </Wrapper>
    </Background>
  );
};

Tickets.getInitialProps = async () => {
  const ticketTypes = await api('tickettypes?_sort=quantity:desc');
  return { ticketTypes };
};

export default withBackground(Tickets);

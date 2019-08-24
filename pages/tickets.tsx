import React from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import TicketType from '../types/TicketType';
import Background from '../components/atoms/Background';
import { Header1 } from '../components/atoms/Headers';
import { Center, rhythm } from '../components/typography';
import { CardList } from '../components/molecules/Card';
import { api } from './_app';
import { breakpointMax, breakpointMin, colors } from '../components/variables';
import Container from '../components/atoms/Container';

interface Props {
  ticketTypes: TicketType[];
}

export const BasketWrapper = styled('aside')({
  display: 'flex',
  zIndex: 2,
  [breakpointMax('tablet')]: {
    justifyContent: 'center',
    backgroundColor: `${colors.gray}`,
  },
  [breakpointMin('tablet')]: {
    position: 'fixed',
    right: rhythm(1),
  },
});

const Wrapper = styled('main')({
  display: 'flex',
  minHeight: '50vh',
  [breakpointMax('tablet')]: {
    flexDirection: 'column',
  },
  '& > ol': {
    [breakpointMin('tablet')]: {
      paddingLeft: '2rem',
      width: `calc(100vw - ${rhythm(17)})`,
    },
  },
});

const DynamicTicketTile = dynamic(
  () => import('../components/molecules/TicketTile'),
  { ssr: false },
);

const DynamicBasket = dynamic(
  () => import('../components/organisms/Basket'),
  { ssr: false },
);

const DynamicMobileBasketStatus = dynamic(
  () => import('../components/organisms/Basket/MobileBasketStatus'),
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
        <Header1 fat bold stripe>Tickets</Header1>
      </Center>
      <Wrapper>
        {ticketsAvailable ? (
          <React.Fragment>
            <CardList>
              {ticketTypes.map((ticketType, index) => (
                ticketType.active ? (
                  <DynamicTicketTile
                    key={index}
                    {...ticketType}
                  />
                ) : null
              ))}
            </CardList>
            <BasketWrapper>
              <CardList>
                <DynamicBasket
                  submitButton={{ href: '/checkout', label: 'Checkout' }}
                  ticketTypes={ticketTypes}
                />
              </CardList>
            </BasketWrapper>
            <DynamicMobileBasketStatus ticketTypes={ticketTypes} />
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
  const ticketTypes = await api('tickettypes');
  return { ticketTypes };
};

export default Tickets;

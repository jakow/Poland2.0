import TicketType from '../types/TicketType';
import Background from '../components/atoms/Background';
import dynamic from 'next/dynamic';
import { Header1 } from '../components/atoms/Headers';
import styled from '@emotion/styled';
import { Center, rhythm } from '../components/typography';
import { CardList } from '../components/molecules/Card';
import { NextPage } from 'next';
import { api } from './_app';
import { breakpointMax, breakpointMin, colors } from '../components/variables';

interface Props {
  ticketTypes: TicketType[];
}

export const BasketWrapper = styled('aside')({
  display: 'flex',
  zIndex: 2,
  [breakpointMax('tablet')]: {
    justifyContent: 'center',
    backgroundColor: `${colors.gray}`
  },
  [breakpointMin('tablet')]: {
    position: 'fixed',
    right: rhythm(1)
  }
});

const Wrapper = styled('main')({
  display: 'flex',
  minHeight: '50vh',
  [breakpointMax('tablet')]: {
    flexDirection: 'column'
  },
  '& > ol': {
    [breakpointMin('tablet')]: {
      paddingLeft: '2rem',
      width: `calc(100vw - ${rhythm(17)})`,
    },
  }
});

const DynamicTicketTile = dynamic(
  () => import('../components/molecules/TicketTile'),
  { ssr: false }
);

const DynamicBasket = dynamic(
  () => import('../components/organisms/Basket'),
  { ssr: false }
);

const DynamicMobileBasketStatus = dynamic(
  () => import('../components/organisms/Basket/MobileBasketStatus'),
  { ssr: false }
);

const Tickets: NextPage<Props> = ({ ticketTypes }) => (
  <Background>
    <Center>
      <Header1 fat bold stripe>Tickets</Header1>
    </Center>
    <Wrapper>
      <CardList>
        {ticketTypes.length > 0 && ticketTypes.map((ticketType, index) => (
          <DynamicTicketTile
            key={index}
            {...ticketType}
          />
        ))}
      </CardList>
      <BasketWrapper>
        <DynamicBasket
          submitButton={{ href: '/checkout', label: 'Checkout' }}
          ticketTypes={ticketTypes}
        />
      </BasketWrapper>
      <DynamicMobileBasketStatus ticketTypes={ticketTypes}/>
    </Wrapper>
  </Background>
);

Tickets.getInitialProps = async () => {
  const ticketTypes = await api('tickettypes');
  return { ticketTypes };
};

export default Tickets;

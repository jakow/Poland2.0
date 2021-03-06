import React from 'react';
import styled from '@emotion/styled';
import Markdown from 'react-markdown';
import { colors, breakpointMin } from '../variables';
import { rhythm } from '../typography';
import Container from '../atoms/Container';
import Countdown from '../molecules/Countdown';
import { TicketControl } from '../../types/ContentControl';

const Center = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
});

const Wrapper = styled('section')({
  color: `${colors.white}`,
  backgroundColor: `${colors.red}`,
  position: 'relative',
  padding: `${rhythm(1)} 0 ${rhythm(3)} 0`,
  [breakpointMin('tablet')]: {
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
    },
    '&::before': {
      top: 0,
      left: 0,
      backgroundImage: 'url("/static/images/mesh-corner-top-left.svg")',
      width: rhythm(7),
      height: rhythm(3.5),
    },
    '&::after': {
      bottom: 0,
      right: 0,
      width: rhythm(6.5),
      height: rhythm(3.5),
      backgroundImage: 'url("/static/images/mesh-corner-bottom-right.svg")',
    },
  },
});

interface Props {
  ticketControl: TicketControl;
}

const Tickets: React.FunctionComponent<Props> = ({ ticketControl }) => (
  <Wrapper>
    <Container>
      <Center>
        <Markdown>{ticketControl.description}</Markdown>
        {ticketControl.showCountdown
          && <Countdown date={new Date(ticketControl.salesDate)} stroke={`${colors.white}`} />
        }
      </Center>
    </Container>
  </Wrapper>
);

export default Tickets;

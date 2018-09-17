import React from 'react';
import styled from 'react-emotion';
import Markdown from 'react-markdown';
import { colors, rhythm, Container, Countdown, breakpointMin, NavButton } from 'p20-components';
import { ContentControl } from '../models';
const meshTopLeft = require('../static/images/mesh-corner-top-left.svg');
const meshBottomRight = require('../static/images/mesh-corner-bottom-right.svg');

const Center = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center'
});

const Wrapper = styled('section')({
  color: `${colors.white}`,
  backgroundColor: `${colors.primary}`,
  position: 'relative',
  padding: `${rhythm(1)} 0 ${rhythm(3)} 0`,
  [breakpointMin('tablet')]: {
    '&::before, &::after': {
      content: '""',
      position: 'absolute'
    },
    '&::before': {
      top: 0,
      left: 0,
      backgroundImage: `url(${meshTopLeft})`,
      width: rhythm(7),
      height: rhythm(3.5),
    },
    '&::after': {
      bottom: 0,
      right: 0,
      width: rhythm(6.5),
      height: rhythm(3.5),
      backgroundImage: `url(${meshBottomRight})`
    }
  }
});

export default class Tickets extends React.Component<{ tickets: ContentControl['tickets'] }> {
  render() {
    const { tickets } = this.props;
    return (
      <Wrapper>
        <Container>
          <Center>
            <Markdown>{tickets.message.md}</Markdown>
            {tickets.countdown &&
              <Countdown date={new Date(tickets.countdownDate)} stroke={`${colors.white}`}/>
            }
          </Center>
        </Container>
      </Wrapper>
    );
  }
}

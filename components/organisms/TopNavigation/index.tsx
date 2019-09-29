import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  breakpointMin, colors, breakpointMax, shadow
} from '../../variables';
import Brand from './Brand';
import DesktopNav from './DesktopNav';
import MobileNav, { MobileNavButton } from './MobileNav';
import { rhythm } from '../../typography';
import Container from '../../atoms/Container';

export type MenuItem = {
  title: string,
  url: string,
  active?: boolean,
  type?: 'link' | 'button';
  [propName: string]: any;
};

type Props = {
  items: MenuItem[];
};

type State = {
  open: boolean,
};

export const navHeight = rhythm(3);

const Header = styled('header')(
  {
    zIndex: 100,
    position: 'fixed',
    top: -1, // fixes weird 1px space at the top on mobile
    paddingTop: 1,
    left: 0,
    right: 0,
    background: `${colors.red.alpha(0.88)}`,
    backdropFilter: `saturate(180%) blur(${rhythm(0.25)})`,
  },
  shadow,
);

const Layout = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  [breakpointMin('tabletLarge')]: {
    justifyContent: 'space-between',
  },
});

const Column = styled('div')({
  position: 'relative',
  height: navHeight,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const brand = css({
  [breakpointMax('tabletLarge')]: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
});

const MobileNavButtonContainer = styled('div')({
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
  [breakpointMin('tabletLarge')]: {
    display: 'none',
  },
});

export default class TopNavigation extends React.Component<Props, State> {
  state = {
    open: false,
  };

  toggleNav = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { items } = this.props;
    const { open } = this.state;
    return (
      <Header>
        <Container>
          <Layout>
            <Column css={brand}>
              <Brand />
            </Column>
            <Column>
              <DesktopNav items={items} />
            </Column>
          </Layout>
          <MobileNavButtonContainer>
            <MobileNavButton
              onClick={this.toggleNav}
              isOpen={open}
              navName="Mobile navigation"
            />
          </MobileNavButtonContainer>
        </Container>
        <MobileNav
          items={items}
          open={open}
          requestClose={this.toggleNav}
        />
      </Header>
    );
  }
}

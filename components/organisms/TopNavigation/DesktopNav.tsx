import * as React from 'react';
import styled from '@emotion/styled';
import { MenuItem } from '.';
import typography, { Anchor } from '../../typography';
import { breakpointMin } from '../../variables';
import { NavButton } from '../../atoms/Button';

const { rhythm } = typography;

const Container = styled('nav')({
  height: rhythm(3),
  display: 'none',
  [breakpointMin('tablet')]: {
    display: 'block',
  },
});

const MenuList = styled('ul')({
  display: 'flex',
  flexDirection: 'row',
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

const MenuListItem = styled('li')({
  marginBottom: 0
});

type Props = {
  items: MenuItem[],
  Router?: React.ComponentType<any>
};

export default ({ items, Router }: Props) => (
  <Container aria-label="Desktop navigation">
    <MenuList>
      {items.map((item, index) => (
        <MenuListItem key={index}>
          {item.type === 'button'
            ? <span style={{ padding: `0 ${rhythm(0.5)}`}}>
                <NavButton
                  href={item.url}
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ marginTop: rhythm(0.5) }}
                >
                  {item.title}
                </NavButton>
              </span>
            : Router ?
              <Router href={item.url}>
                <Anchor active={item}>{item.title}</Anchor>
              </Router>
              : <Anchor href={item.url} active={item}>{item.title}</Anchor>
        }
      </MenuListItem>
      ))}
    </MenuList>
  </Container>
);

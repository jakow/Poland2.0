import * as React from 'react';
import styled from '@emotion/styled';
import { MenuItem } from '.';
import typography, { Anchor } from '../../typography';
import { breakpointMin } from '../../variables';
import Button, { NavButton } from '../../atoms/Button';
import Link from 'next/link';

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
  items: MenuItem[]
};

export default ({ items }: Props) => (
  <Container aria-label="Desktop navigation">
    <MenuList>
      {items.map((item, index) => (
        <MenuListItem key={index}>
          {item.type === 'button'
            ? <span style={{ padding: `0 ${rhythm(0.5)}` }}>
                {/* <NavButton
                  href={item.url}
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ marginTop: rhythm(0.5) }}
                >
                  {item.title}
                </NavButton> */}
                <Link href={item.url}>
                  <Button style={{ marginTop: rhythm(0.5) }}>{item.title}</Button>
                </Link>
              </span>
            : <Link href={item.url}>
                <Anchor active={item}>{item.title}</Anchor>
              </Link>
        }
      </MenuListItem>
      ))}
    </MenuList>
  </Container>
);

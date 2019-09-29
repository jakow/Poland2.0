import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { MenuItem } from '.';
import typography, { Anchor } from '../../typography';
import { breakpointMin } from '../../variables';
import Button from '../../atoms/Button';

const { rhythm } = typography;

const Container = styled('nav')({
  height: rhythm(3),
  display: 'none',
  [breakpointMin('tabletLarge')]: {
    display: 'block',
  },
});

const MenuList = styled('ul')({
  display: 'flex',
  flexDirection: 'row',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  height: '100%',
});

const MenuListItem = styled('li')({
  marginBottom: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

type Props = {
  items: MenuItem[]
};

export default ({ items }: Props) => (
  <Container>
    <MenuList>
      {items.map((item, index) => (
        <MenuListItem key={index}>
          {item.type === 'button' ? (
            <span style={{ padding: `0 ${rhythm(0.5)}` }}>
              <Link href={item.url}>
                <Button>{item.title}</Button>
              </Link>
            </span>
          ) : (
            <Link href={item.url}>
              <Anchor bold>{item.title}</Anchor>
            </Link>
          )}
        </MenuListItem>
      ))}
    </MenuList>
  </Container>
);

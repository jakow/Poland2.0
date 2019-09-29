import * as React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { colors } from '../../variables';
import { rhythm } from '../../typography';

const logo = require('../../../static/images/logo_white.svg');

const BrandLink = styled('a')({
  color: `${colors.dark}`,
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  zIndex: 1000,
  marginLeft: rhythm(0.5),
  marginRight: rhythm(1),
  cursor: 'pointer',
});

const BrandLogo = styled('img')({
  height: rhythm(2),
  marginTop: rhythm(0.5),
  marginBottom: rhythm(0.5),
  minWidth: rhythm(1.66),
  transition: 'filter 200ms ease-in-out',
  ':hover': {
    filter: 'invert(0.1)',
  },
});

export default () => (
  <Link href="/">
    <BrandLink title="Home Page">
      <BrandLogo src={logo} alt="Poland 2.0 Summit logo" />
    </BrandLink>
  </Link>
);

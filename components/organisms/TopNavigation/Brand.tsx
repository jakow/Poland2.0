import * as React from 'react';
import styled from '@emotion/styled';
import { colors } from '../../variables';
import { rhythm } from '../../typography';
import Link from 'next/link';

const logo = require('../../../static/images/logo.svg');

const BrandLink = styled('a')({
  // resets
  color: `${colors.dark}`,
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  zIndex: 1000,
  padding: `0 ${rhythm(1)}`, // to make it easily clickable on mobile,
  cursor: 'pointer'
});

const BrandLogo = styled('img')({
  height: rhythm(2),
  marginTop: rhythm(0.5),
  marginBottom: rhythm(0.5),
  minWidth: rhythm(1.66)
});

export default () => {
  const brandLogo = <BrandLogo src={`${logo}`} alt="Poland 2.0 logo"/>;
  return (
    <Link href="/">
      <BrandLink title="Home Page">
        {brandLogo}
      </BrandLink>
    </Link>
  );
};

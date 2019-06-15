import * as React from 'react';
import styled from '@emotion/styled';
import { colors } from 'components/variables';
import AnimatedLogo from 'components/AnimatedLogo';

const _Loader = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: `${colors.white}`,
  zIndex: 2018,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

const Logo = styled('div')({
  willChange: 'transform',
  zIndex: 6,
  svg: {
    transform: 'translateY(4px)'
  }
});

const Loader: React.StatelessComponent = () => (
  <_Loader>
      <Logo>
        <AnimatedLogo/>
      </Logo>
  </_Loader>
);

export default Loader;

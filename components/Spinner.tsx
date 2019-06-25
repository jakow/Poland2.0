// Credits to https://github.com/MatejKustec/SpinThatShit

import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { colors } from './variables';
import { rhythm } from './typography';

const loaderRotate = keyframes({
  from: {
    transform: 'rotate(0)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

const props =  {
  size: rhythm(2),
  color: colors.primary,
  borderSize: '3px',
  duration: '1s',
};

const Spinner = styled('div')({
  width: props.size,
  height: props.size,
  border: `${props.borderSize} solid ${props.color.fade(0.75)}`,
  borderTopColor: `${props.color}`,
  borderRadius: '50%',
  position: 'absolute',
  animation: `${loaderRotate} ${props.duration} linear infinite`,
  zIndex: 2,
});

export default Spinner;

import { css } from '@emotion/core';
import Color from 'color';
import memoize from '../helpers/memoize';

export const colors = {
  red: Color('#C53D57'),
  dark: Color('#323232'),
  white: Color('#F5F5F5'),
  gray: Color('#BAC7BE'),
  grayDark: Color('#999999'),
  blue: Color('#082E9B'),
  green: Color('#66BB91'),
  purple: Color('#AC1E70'),
  teal: Color('#70D8D1'),
};

export const transition = (selector: string) => css({
  transition: `${selector} 200ms ease-in-out`,
});

export const shadowLight = css(
  {
    boxShadow: '0 3px 6px rgba(50,50,50,0.16), 0 3px 6px rgba(50,50,50,0.23)',
  },
  transition('box-shadow'),
);

export const shadow = css(
  {
    boxShadow: '0 10px 20px rgba(50,50,50,0.19), 0 6px 6px rgba(50,50,50,0.23)',
  },
  transition('box-shadow'),
);

export const shadowActive = css(
  {
    boxShadow: '0 14px 28px rgba(50,50,50,0.25), 0 10px 10px rgba(50,50,50,0.22)',
  },
  transition('box-shadow'),
);

interface Breakpoints {
  mobileSmall: number;
  mobile: number;
  tablet: number;
  tabletLarge: number;
  laptop: number;
  desktop: number;
}

export const breakpoints: Breakpoints = {
  mobileSmall: 320,
  mobile: 425,
  tablet: 768,
  tabletLarge: 860,
  laptop: 1024,
  desktop: 1280,
};

type Breakpoint = keyof Breakpoints;

export const breakpointMin = memoize((bp: Breakpoint | number) => {
  const bpValue = typeof bp === 'number' ? bp : breakpoints[bp];
  return `@media screen and (min-width: ${bpValue}px)`;
});

export const breakpointMax = memoize((bp: Breakpoint | number) => {
  const bpValue = typeof bp === 'number' ? bp : breakpoints[bp];
  return `@media screen and (max-width: ${bpValue}px)`;
});

import { css } from '@emotion/core';
import Color from 'color';
import memoize from '../helpers/memoize';

export const colors = {
  red: Color('#C63D57'),
  dark: Color('#323232'),
  gray: Color('#F5F5F5'), // new: #BAC7BE
  mediumGray: Color('#cccccc'),
  darkGray: Color('#999999'),
  white: Color('#FFFFFF'), // new: #F5F5F5
  deepBlue: Color('#00458A'),
  empowerGreen: Color('#66BB91'),
  royalPurple: Color('#AC1E70'),
  teal: Color('#70D8D1')
};

export const idleShadow = css({
  boxShadow: '0 1px 8px 0 rgba(0, 0, 0, 0.16)',
  transition: 'box-shadow 200ms ease-in-out'
});

export const hoverShadow = css({
  boxShadow: '0 2px 8px 1px rgba(0, 0, 0, 0.16)',
  transition: 'box-shadow 200ms ease-in-out'
});

export const redShadow = css({
  boxShadow: `0 3px 8px 1px ${colors.red}`,
  transition: 'box-shadow 200ms ease-in-out'
});

export const activeShadow = css({
  boxShadow: '0 3px 8px 1px rgba(0, 0, 0, 0.16)',
  transition: 'box-shadow 200ms ease-in-out'
});

interface Breakpoints {
  mobileSmall: number;
  mobile: number;
  tablet: number;
  tabletLandscape: number;
  desktop: number;
  desktopWide: number;
}

export const breakpoints: Breakpoints = {
  mobileSmall: 384,
  mobile: 512,
  tablet: 768,
  tabletLandscape: 960,
  desktop: 1024,
  desktopWide: 1280,
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

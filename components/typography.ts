import Typography from 'typography';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { css as _css } from 'emotion';
import { colors, transition } from './variables';

const headerFonts = ['League Spartan', 'sans-serif'];
const bodyFonts = ['Montserrat', 'sans-serif'];

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.5,
  scaleRatio: 2,
  googleFonts: [
    {
      name: 'Montserrat',
      styles: ['400', '400i', '600', '700'],
    },
  ],
  headerFontFamily: headerFonts,
  bodyFontFamily: bodyFonts,
  bodyColor: `${colors.dark}`,
});

/* eslint-disable-next-line */
export const rhythm = typography.rhythm;

export const globalStyle = css({
  'html::-webkit-scrollbar': {
    width: 0,
  },
  body: transition('background-color'),
  'a[id]': {
    display: 'block',
    position: 'relative',
    top: `-${rhythm(3)}`,
  },
  small: {
    color: `${colors.grayDark}`,
    a: {
      textDecoration: 'none',
      fontStyle: 'italic',
      color: `${colors.blue}`,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  '.bp3-icon': {
    display: 'inline-block',
    flex: '0 0 auto',
    verticalAlign: 'text-bottom',
    '& > svg': {
      display: 'block',
    },
    '& > svg:not([fill])': {
      fill: 'currentColor',
    },
  },
});

export const Anchor = styled('a')<{ bold?: boolean, dark?: boolean }>(
  props => ({
    cursor: 'pointer',
    display: 'inline-block',
    position: 'relative',
    fontWeight: props.bold ? 600 : 300,
    textDecoration: 'none',
    textAlign: 'center',
    color: `${props.dark ? colors.dark : colors.white}`,
    margin: `0 ${rhythm(0.5)}`,
    '&:hover': {
      color: `${props.dark ? colors.dark.fade(0.5) : colors.white.fade(0.25)}`,
    },
    img: {
      marginBottom: -2,
      marginRight: rhythm(0.33),
      height: rhythm(0.75),
    },
  }),
  transition('color'),
);

const boldStyle = {
  fontWeight: 600,
};
export const bold = css(boldStyle);
export const _bold = _css(boldStyle);

export const Center = styled('div')({ textAlign: 'center' });

const fatStyle = {
  paddingTop: rhythm(1),
  paddingBottom: rhythm(1),
};
export const fat = css(fatStyle);
export const _fat = _css(fatStyle);

export const dangerousSuperscripts = (text: string) => {
  const ordinalRegexp = /\d+(st|th|rd|nd)/g;
  return {
    __html: text.replace(ordinalRegexp, (substr: string) => {
      const subscript = substr.replace(/\d+/, '');
      return substr.replace(subscript, `<sup>${subscript}</sup>`);
    }),
  };
};

export default typography;

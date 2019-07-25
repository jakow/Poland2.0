import Typography from 'typography';
import { colors, breakpointMin } from './variables';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { css as _css } from 'emotion';

const stripeSVG = require('../static/images/stripe.svg');

const headerFonts = ['Source Sans Pro', 'sans-serif'];
const bodyFonts = ['Montserrat', 'sans-serif'];

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.5,
  scaleRatio: 2.375,
  googleFonts: [
    {
      name: 'Montserrat',
      styles: ['300', '400', '400i', '600', '700'],
    },
    {
      name: 'Source Sans Pro',
      styles: ['300', '400', '400i', '600', '700'],
    },
  ],
  headerFontFamily: headerFonts,
  headerWeight: 300,
  bodyFontFamily: bodyFonts,
  bodyColor: colors.dark.toString()
});

export const { rhythm, scale } = typography;

export const globalStyle = css({
  'a[id]': {
    display: 'block',
    position: 'relative',
    top: `-${rhythm(3)}`
  },
  small: {
    color: `${colors.darkGray}`,
    a: {
      textDecoration: 'none',
      fontStyle: 'italic',
      color: `${colors.deepBlue}`,
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  '.bp3-icon': {
    display: 'inline-block',
    flex: '0 0 auto',
    verticalAlign: 'text-bottom',
    '& > svg': {
      display: 'block'
    },
    '& > svg:not([fill])': {
      fill: 'currentColor'
    }
  },
});

export const Anchor = styled('a')<{ [propName: string]: any }>({
  cursor: 'pointer',
  display: 'inline-block',
  position: 'relative',
  fontWeight: 300,
  textDecoration: 'none',
  color: `${colors.dark}`,
  margin: `${rhythm(1)} ${rhythm(0.5)}`,
  [breakpointMin('tablet')]: {
    '&:before': {
      content: '""',
      position: 'absolute',
      top: rhythm(1),
      backgroundColor: `${colors.dark}`,
      width: '100%',
      height: 1,
      maxWidth: 0,
      transition: 'max-width 125ms cubic-bezier(0.77, 0, 0.175, 1)',
    },
    '&:hover': {
      '&:before': {
        maxWidth: '100%',
      },
    }
  }
});

const boldStyle = {
  fontWeight: 600
};
export const bold = css(boldStyle);
export const _bold = _css(boldStyle);

export const Center = styled('div')({ textAlign: 'center' });

const fatStyle = {
  marginTop: rhythm(1),
  marginBottom: rhythm(2),
};
export const fat = css(fatStyle);
export const _fat = _css(fatStyle);

export const dangerousSuperscripts = (text: string) => {
  const ordinalRegexp = /\d+(st|th|rd|nd)/g;
  return { __html: text.replace(ordinalRegexp, (substr: string) => {
    const subscript = substr.replace(/\d+/, '');
    return substr.replace(subscript, `<sup>${subscript}</sup>`);
  })};
};

export const stripe = css({
  position: 'relative',
  display: 'inline-block',
  verticalAlign: 'top',
  lineHeight: rhythm(2),
  '&::before': {
    content: '""',
    width: '100%',
    display: 'block',
    position: 'absolute',
    bottom: -7,
    height: 7,
    backgroundImage: `url(${stripeSVG})`,
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'round',
  },
});
export const _stripe = _css({
  position: 'relative',
  display: 'inline-block',
  verticalAlign: 'top',
  lineHeight: rhythm(2),
  '&::before': {
    content: '""',
    width: '100%',
    display: 'block',
    position: 'absolute',
    bottom: -7,
    height: 7,
    backgroundImage: `url(${stripeSVG})`,
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'round',
  },
});

const thinStyle = {
  fontWeight: 300
};
export const thin = css(thinStyle);
export const _thin = _css(thinStyle);

export default typography;

// SOURCE: https://github.com/una/CSSgram/blob/master/source/css/walden.css
import { css } from '@emotion/core';

export default css({
  position: 'relative',
  filter: 'brightness(1.1) hue-rotate(-10deg) sepia(0.3) saturate(1.6)',
  img: {
    width: '100%',
    zIndex: 1
  },
  ':before': {
    content: '""',
    display: 'block',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 2
  },
  ':after': {
    content: '""',
    display: 'block',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 3
  },
  '::after': {
    background: '#0044cc',
    mixBlendMode: 'screen',
    opacity: .3
  }
});

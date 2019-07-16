import styled from '@emotion/styled';
import { colors } from '../variables';
import { rhythm } from '../typography';
import { css } from '@emotion/core';

const themes = {
  primary: {
    foreground: colors.white,
    background: colors.red,
  },
};

interface Props {
  hollow?: boolean;
  wide?: boolean;
}

const options = (props: Props) => css({
  width: props.wide ? '100%' : 'initial'
});

const theme = (props: Props) => {
  const { foreground, background } = themes['primary'];
  if (props.hollow) {
    return css(
      {
        padding: rhythm(0.5),
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: `${background}`,
        color: `${background}`,
        backgroundColor: 'transparent',
        boxShadow: 'none',
        ':hover': {
          borderColor: `${background.lighten(0.2)}`,
          color: `${background.lighten(0.2)}`
        }
      }
    );
  }

  return css({
    color: `${foreground}`,
    backgroundColor: `${background}`,
    '&:hover': {
      backgroundColor: `${background.darken(0.1)}`,
    },
  });
};

const style = css({
  WebkitAppearance: 'none',
  borderRadius: 1,
  display: 'inline-block',
  padding: `${rhythm(0.5)} ${rhythm(1)}`,
  position: 'relative',
  textAlign: 'center',
  verticalAlign: 'middle',
  touchAction: 'manipulation',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0px 2px 7px 0px rgba(1, 1, 1, 0.18)',
});

export const Button = styled('button')([
  style,
  theme,
  options
]);

export const NavButton = styled('a')([style, theme]);

export default Button;

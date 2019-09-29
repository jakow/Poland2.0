import Color from 'color';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { colors, shadowLight, transition } from '../variables';
import { bold, rhythm } from '../typography';
import Spinner from './Spinner';

const options = (props: Props) => css({
  minWidth: props.width,
  width: props.wide && '100%',
  paddingTop: props.compact && 0,
  paddingBottom: props.compact && 0,
});

const themeConfig = (props: Props) => {
  const foreground = props.foreground || colors.white;
  const background = props.background || colors.green;

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
          color: `${background.lighten(0.2)}`,
        },
      },
    );
  }

  return css({
    color: `${foreground}`,
    backgroundColor: `${background}`,
    ':hover': {
      backgroundColor: `${background.darken(0.1)}`,
    },
  });
};

const baseStyle = css(
  {
    WebkitAppearance: 'none',
    borderRadius: 1,
    display: 'inline-block',
    paddingTop: rhythm(0.5),
    paddingBottom: rhythm(0.5),
    paddingLeft: rhythm(1),
    paddingRight: rhythm(1),
    position: 'relative',
    textAlign: 'center',
    verticalAlign: 'middle',
    touchAction: 'manipulation',
    textDecoration: 'none',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    border: 'none',
    cursor: 'pointer',
    ':disabled': {
      pointerEvents: 'none',
      color: `${colors.grayDark}`,
      backgroundColor: `${colors.gray}`,
    },
    ':focus': {
      outline: 'none',
    },
    div: {
      width: rhythm(1),
      height: rhythm(1),
      position: 'relative',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  shadowLight,
  bold,
  transition('background-color'),
);

const ButtonWrapper = styled('button')([
  baseStyle,
  themeConfig,
  options,
]);

interface Props {
  hollow?: boolean;
  wide?: boolean;
  background?: Color,
  foreground?: Color,
  compact?: boolean;
  loading?: boolean;
  disabled?: boolean;
  width?: string;
  [propName: string]: any;
}

interface State {
  _loading: boolean;
  _disabled: boolean;
}

export class Button extends React.Component<Props, State> {
  state = {
    _loading: false,
    _disabled: false,
  };

  render() {
    const {
      children, disabled, loading, theme, ...other
    } = this.props;
    const { _loading, _disabled } = this.state;
    return (
      <ButtonWrapper {...other} disabled={disabled || _disabled || loading || _loading}>
        {(loading || _loading) ? <Spinner /> : children}
      </ButtonWrapper>
    );
  }
}

export const NavButton = styled('a')([baseStyle, themeConfig]);

export default Button;

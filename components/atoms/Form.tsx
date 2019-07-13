import React from 'react';
import { NextFC } from 'next';
import styled from '@emotion/styled';
import { Icon, IconName } from '@blueprintjs/core';
import { colors, activeShadow, idleShadow } from '../variables';
import { rhythm } from '../typography';
import { Field as FormikField } from 'formik';

const borderStyle = '1px solid rgba(1, 1, 1, 0.12)';

interface FieldProps {
  name: string;
  type: string;
  placeholder: string;
  leftIcon?: IconName;
  mandatory?: boolean;
  error?: string;
}

const Flex = styled('div')(
  idleShadow,
  (props: { error?: string }) => ({
    border: borderStyle,
    display: 'flex',
    '&, & > *': {
      backgroundColor: props.error ? `${colors.red.fade(0.9)}` : `${colors.white}`,
      transition: 'background-color 200ms ease-in-out'
    },
    '.bp3-icon': {
      paddingTop: rhythm(0.35),
      paddingLeft: rhythm(0.5)
    },
    '.bp3-icon:last-of-type': {
      paddingRight: rhythm(0.5)
    },
    '& > *': {
      padding: rhythm(0.25)
    },
    input: {
      color: `${colors.dark}`,
      border: 'none',
      flex: 1,
      '&:focus': {
        outline: 'none'
      }
    },
    '&:focus': {
      outline: 'none'
    },
    '&:hover, &:focus-within': activeShadow
  })
);

const Wrapper = styled('fieldset')(
  {
    marginBottom: rhythm(0.75),
    border: 'none',
    small: {
      marginTop: rhythm(1),
      marginLeft: rhythm(1.75)
    }
  }
);

export const Field: NextFC<FieldProps> = ({
  name, type, placeholder, leftIcon, mandatory, error
}) => (
  <Wrapper>
    <Flex error={error}>
      <Icon icon={leftIcon} iconSize={16} color={`${colors.dark}`}/>
      <FormikField id={name} name={name} type={type} placeholder={placeholder} required={true}/>
      {mandatory ? <Icon icon="asterisk" color={`${colors.red}`} iconSize={16}/> : null}
    </Flex>
    {error
    ? <small>{error}</small>
    : null
    }
  </Wrapper>
);

import React, { FunctionComponent } from 'react';
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
  options?: string[];
}

const Flex = styled('div')(
  idleShadow,
  (props: { error?: string }) => ({
    border: borderStyle,
    display: 'flex',
    '&, & > *': {
      color: `${colors.dark}`,
      backgroundColor: props.error ? `${colors.red.fade(0.9)}` : `${colors.white}`,
      transition: 'background-color 200ms ease-in-out'
    },
    '.bp3-icon': {
      paddingTop: rhythm(0.35),
      paddingLeft: rhythm(0.5)
    },
    '.bp3-icon:last-child': {
      paddingRight: rhythm(0.5)
    },
    '& > *': {
      padding: rhythm(0.25)
    },
    input: {
      color: `${colors.dark}`,
      border: 'none',
      flex: 1,
      ':focus': {
        outline: 'none'
      }
    },
    'textarea, select': {
      width: '100%',
      ':focus': {
        outline: 'none'
      },
      border: 'none',
      resize: 'none'
    },
    textarea: {
      height: rhythm(3)
    },
    select: {
      paddingLeft: rhythm(0.2),
      ':last-child': {
        marginRight: rhythm(0.5)
      }
    },
    ':focus': {
      outline: 'none'
    },
    ':hover, :focus-within': activeShadow
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

export const InputField: FunctionComponent<FieldProps> = ({
  name, type, placeholder, leftIcon, mandatory, error, options
}) => (
  <Wrapper>
    <Flex error={error}>
      {leftIcon
      ? <Icon icon={leftIcon} iconSize={16} color={`${colors.dark}`}/>
      : <div style={{ width: '32px' }}/>
      }
      {(() => {
        switch (type) {
          case 'select':
            return <FormikField
              component="select"
              id={name}
              name={name}
              required={mandatory}
            >
              <option value="" disabled hidden>{placeholder}</option>
              {options
              ? options.map((option, index) => <option key={index} value={option}>{option}</option>)
              : null
              }
            </FormikField>;
          case 'textarea':
            return <FormikField
              component="textarea"
              id={name}
              name={name}
              placeholder={placeholder}
              required={mandatory}
            />;
          default:
            return <FormikField
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              required={mandatory}
            />;
        }
      })()}
      {mandatory
      ? <Icon
          icon="asterisk"
          color={`${colors.red}`}
          iconSize={16}
          title="This field is mandatory."
      />
      : null}
    </Flex>
    {error
    ? <small>{error}</small>
    : null
    }
  </Wrapper>
);

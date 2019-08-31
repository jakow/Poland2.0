import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Icon, IconName } from '@blueprintjs/core';
import { Field as FormikField } from 'formik';
import { colors, activeShadow, idleShadow, breakpointMin, breakpointMax } from '../variables';
import { rhythm } from '../typography';

const borderStyle = '1px solid rgba(1, 1, 1, 0.12)';

interface FieldProps {
  error?: string;
  icon?: IconName | JSX.Element;
  inline?: boolean;
  mandatory?: boolean;
  mobileFriendly?: boolean;
  name: string;
  type: string;
  placeholder?: string;
  prefix?: string;
  values?: string[];
  selectOptions?: SelectProps;
}

interface SelectProps {
  valueLabel?: string;
  nameLabel?: string;
  data: SelectOption[];
}

interface SelectOption {
  value: string;
  name?: string;
}

const Flex = styled('div')(
  idleShadow,
  (props: { error?: string }) => ({
    border: borderStyle,
    display: 'flex',
    '&, & > *': {
      color: `${colors.dark}`,
      backgroundColor: props.error ? `${colors.red.fade(0.9)}` : `${colors.white}`,
      transition: 'background-color 200ms ease-in-out',
    },
    '.bp3-icon': {
      paddingTop: rhythm(0.35),
      paddingLeft: rhythm(0.5),
    },
    '.bp3-icon:last-child': {
      paddingRight: rhythm(0.5),
    },
    '.prefix': {
      lineHeight: '26px',
      '& + *': {
        paddingLeft: 0,
      },
    },
    '& > *': {
      padding: rhythm(0.25),
    },
    input: {
      color: `${colors.dark}`,
      border: 'none',
      flex: 1,
      ':focus': {
        outline: 'none',
      },
    },
    'textarea, select': {
      width: '100%',
      ':focus': {
        outline: 'none',
      },
      border: 'none',
      resize: 'none',
    },
    textarea: {
      height: rhythm(3),
    },
    select: {
      paddingLeft: rhythm(0.2),
      ':last-child': {
        marginRight: rhythm(0.5),
      },
    },
    ':focus': {
      outline: 'none',
    },
    ':hover, :focus-within': activeShadow,
  }),
);

const Wrapper = styled('fieldset')(
  ((props: { inline?: boolean }) => ({
    display: props.inline ? 'inline' : 'block',
    marginBottom: rhythm(0.75),
    border: 'none',
    small: {
      marginTop: rhythm(1),
      marginLeft: rhythm(1.75),
      color: `${colors.red}`,
    },
  })),
);

const Buttons = styled('div')((props: { mobileFriendly?: boolean }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  flexWrap: 'wrap',
  '*': {
    marginRight: rhythm(0.25),
    flexBasis: '45%',
    [breakpointMin('tabletLandscape')]: {
      flexBasis: '22.5%',
    },
    [breakpointMax('tablet')]: {
      marginBottom: props.mobileFriendly ? rhythm(0.5) : 'unset',
    },
  },
}));

const InputField: FunctionComponent<FieldProps> = ({
  name, type, placeholder, icon, inline, mobileFriendly, prefix, mandatory, error, selectOptions, values,
}) => {
  let LeftIcon;
  if (typeof icon === 'string') {
    LeftIcon = <Icon icon={icon} iconSize={16} color={`${colors.dark}`} />;
  } else if (icon) {
    LeftIcon = <span className="bp3-icon" style={{ width: 34 }}>{icon}</span>;
  }

  let Content;
  if (type === 'radio' || type === 'checkbox') {
    Content = (
      <Buttons mobileFriendly={mobileFriendly}>
        {values ? values.map((value, index) => (
          <label key={index}> {/* eslint-disable-line */}
            <FormikField
              type={type}
              name={name}
              required={mandatory}
              value={value}
            />
            {value}
          </label>
        )) : null}
      </Buttons>
    );
  } else {
    Content = (
      <Flex error={error}>
        {LeftIcon || <div style={{ width: '32px' }} />}
        {prefix ? <span className="prefix">{prefix}</span> : null}
        {(() => {
          switch (type) {
            case 'select':
              return (
                <FormikField
                  as="select"
                  id={name}
                  name={name}
                  required={mandatory}
                >
                  <option value="" disabled hidden>{placeholder}</option>
                  {selectOptions
                    ? selectOptions.data.map((option, index) => (
                      <option
                        key={index}
                        value={option[`${selectOptions.valueLabel || 'value'}`]}
                      >
                        {option[`${selectOptions.nameLabel || 'name'}`] || option.value}
                      </option>
                    ))
                    : null
                  }
                </FormikField>
              );
            case 'textarea':
              return (
                <FormikField
                  as="textarea"
                  id={name}
                  name={name}
                  placeholder={placeholder}
                  required={mandatory}
                />
              );
            default:
              return (
                <FormikField
                  id={name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  required={mandatory}
                  size={8}
                />
              );
          }
        })()}
        {mandatory
          ? (
            <Icon
              icon="asterisk"
              color={`${colors.red}`}
              iconSize={16}
              title="This field is mandatory."
            />
          ) : null
        }
      </Flex>
    );
  }

  return (
    <Wrapper inline={inline}>
      {Content}
      {error
        ? <small>{error}</small>
        : null
      }
    </Wrapper>
  );
};

export default InputField;

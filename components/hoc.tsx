import { Global } from '@emotion/core';
import Color from 'color';
import React from 'react';
import { Header } from './organisms/TopNavigation';
import { colors } from './variables';

export const withBackground = (Page, color?: Color) => {
  const WithBackground = props => (
    <React.Fragment>
      <Global styles={{
        body: {
          backgroundColor: `${color || colors.white}`,
          [Header as any]: {
            backgroundColor: `${(color && color.alpha(0.88)) || colors.red.alpha(0.88)}`,
          },
        },
      }}
      />
      <Page {...props} />
    </React.Fragment>
  );

  WithBackground.getInitialProps = async context => (Page.getInitialProps ? Page.getInitialProps(context) : {});

  return WithBackground;
};

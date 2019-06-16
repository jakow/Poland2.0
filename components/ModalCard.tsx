import React from 'react';
import styled from '@emotion/styled';
import { colors } from './variables';
import { rhythm } from './typography';

const Container = styled('section')({
  backgroundColor: `${colors.white}`,
  padding: rhythm(1),
  border: `1px solid ${colors.mediumGray}`,
});

const ModalCard: React.StatelessComponent = ({ children }) => (
  <Container>
    {children}
  </Container>
);

export default ModalCard;

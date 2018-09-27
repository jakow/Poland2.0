import React from 'react';
import styled from 'react-emotion';
import { colors, rhythm } from '@poland20/p20-components';

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

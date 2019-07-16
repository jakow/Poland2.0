import styled from '@emotion/styled-base';
import { colors } from '../variables';

const Background = styled('section')({
  '& > *:nth-of-type(odd)': {
    backgroundColor: `${colors.gray}`
  },
  '& > *:nth-of-type(even)': {
    backgroundColor: `${colors.white}`
  }
});

export default Background;

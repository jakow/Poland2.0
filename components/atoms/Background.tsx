import styled from '@emotion/styled-base';
import { colors } from '../variables';

const Background = styled('section')({
  '& > *:nth-of-type(odd):not(a)': {
    backgroundColor: `${colors.gray}`
  },
  '& > *:nth-of-type(even):not(a)': {
    backgroundColor: `${colors.white}`
  }
});

export default Background;

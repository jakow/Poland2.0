import styled from '@emotion/styled';
import Color from 'color';
import { colors } from '../variables';

const Background = styled('section')<{ backgroundColor?: Color }>(props => ({
  backgroundColor: `${props.backgroundColor || colors.white}`,
}));

export default Background;

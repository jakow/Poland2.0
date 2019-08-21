import styled from '@emotion/styled';
import { bold, fat, stripe, thin } from '../typography';

interface Props {
  bold?: boolean;
  fat?: boolean;
  stripe?: boolean;
  thin?: boolean;
  noMargin?: boolean;
}

const options = (props: Props) => [
  props.bold && bold,
  props.fat && fat,
  props.stripe && stripe,
  props.thin && thin,
  props.noMargin && { margin: 0 }
];

export const Header1 = styled('h1')(options);
export const Header2 = styled('h2')(options);
export const Header3 = styled('h3')(options);
export const Header4 = styled('h4')(options);

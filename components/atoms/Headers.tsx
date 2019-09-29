import styled from '@emotion/styled';
import { fat } from '../typography';

interface Props {
  bodyFont?: boolean;
  bold?: boolean;
  fat?: boolean;
  noMargin?: boolean;
  normal?: boolean;
  semiBold?: boolean;
  uppercase?: boolean;
}

const options = (props: Props) => [
  props.bodyFont && { fontFamily: 'inherit' },
  props.bold && { fontWeight: 'bold' },
  props.fat && fat,
  props.noMargin && { margin: 0 },
  props.normal && { fontWeight: 'normal' },
  props.semiBold && { fontWeight: 600 },
  props.uppercase && { textTransform: 'uppercase' },
];

// @ts-ignore
export const Header1 = styled('h1')(options);
// @ts-ignore
export const Header2 = styled('h2')(options);
// @ts-ignore
export const Header3 = styled('h3')(options);
// @ts-ignore
export const Header4 = styled('h4')(options);

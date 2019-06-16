import * as React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

// tslint:disable
// TODO: find a way of loading this from a file
const Logo: React.StatelessComponent = () => (
  <svg version="1.1" x="0" y="0" width="96" height="110" viewBox="0, 0, 373.768, 430.135">
    <g id="Layer_1" transform="translate(-53.116, -24.933)">
        <path className="tr1" d="M251.333,24.933 L192.416,120.96 L53.116,68.536 z" fill="#C53D56"/>
        <path className="tr2" d="M304.446,68.825 L224.404,68.825 L192.416,120.96 z" fill="#AF3750"/>
        <path className="tr3" d="M53.116,68.076 L192.416,120.593 L142.89,179.053 z" fill="#E2445C"/>
        <path className="tr4" d="M53.324,68.144 L142.907,179.055 L81.735,220.098 z" fill="#AF3750"/>
        <path className="tr5" d="M192.416,120.592 L142.907,179.024 L259.569,225.862 z" fill="#D23F57"/>
        <path className="tr6" d="M259.569,225.862 L192.416,120.959 L304.446,68.824 z" fill="#C53D56"/>
        <path className="tr7" d="M259.569,225.862 L143.707,277.907 L191.175,312.231 z" fill="#AF3750"/>
        <path className="tr8" d="M53.324,68.144 L81.735,220.098 L53.782,322.246 z" fill="#C53D56"/>
        <path className="tr9" d="M143.707,277.908 L138.328,357.178 L191.175,312.231 z" fill="#D23F57"/>
        <path className="tr10" d="M138.328,357.177 L191.175,312.231 L201.638,383.042 z" fill="#AF3750"/>
        <path className="tr11" d="M142.907,179.052 L143.692,277.907 L259.569,225.862 z" fill="#E2445C"/>
        <path className="tr12" d="M53.781,322.191 L143.708,277.908 L138.329,357.177 z" fill="#C53D56"/>
        <path className="tr13" d="M142.922,179.052 L81.734,220.097 L143.707,277.907 z" fill="#C53D56"/>
        <path className="tr14" d="M81.735,220.098 L53.782,322.191 L143.708,277.908 z" fill="#E2445C"/>
        <path className="tr15" d="M327.521,194.465 L304.446,68.825 L259.569,225.862 z" fill="#AF3750"/>
        <path className="tr16" d="M327.521,194.465 L259.569,225.85 L309.986,295.511 z" fill="#E2445C"/>
        <path className="tr17" d="M309.977,295.56 L191.166,312.266 L259.561,225.896 z" fill="#C53D56"/>
        <path className="tr18" d="M309.977,295.56 L255.545,367.658 L191.166,312.266 z" fill="#E2445C"/>
        <path className="tr19" d="M191.176,312.231 L201.638,383.043 L255.546,367.658 z" fill="#C53D56"/>
        <path className="tr20" d="M327.521,194.465 L426.883,120.592 L304.446,68.825 z" fill="#C53D56"/>
        <path className="tr21" d="M426.884,215.727 L405.18,269.159 L426.884,120.593 z" fill="#AF3750"/>
        <path className="tr22" d="M405.18,269.159 L426.884,120.593 L327.522,194.465 z" fill="#D23F57"/>
        <path className="tr23" d="M327.521,194.465 L405.179,269.159 L309.977,295.56 z" fill="#C53D56"/>
        <path className="tr24" d="M255.546,367.658 L309.978,358.691 L309.978,295.56 z" fill="#AF3750"/>
        <path className="tr25" d="M201.638,383.043 L255.546,367.658 L304.293,425.633 z" fill="#D23F57"/>
        <path className="tr26" d="M255.546,367.658 L304.293,425.633 L309.978,358.691 z" fill="#C53D56"/>
        <path className="tr27" d="M309.977,295.56 L376.332,358.691 L405.18,269.159 z" fill="#D23F57"/>
        <path className="tr28" d="M309.977,295.56 L376.332,358.691 L309.977,358.691 z" fill="#C53D56"/>
        <path className="tr29" d="M426.884,120.592 L304.446,68.824 L426.884,68.824 z" fill="#E2445C"/>
        <path className="tr30" d="M426.884,358.691 L405.18,269.159 L426.884,215.727 z" fill="#DA3B54"/>
        <path className="tr31" d="M376.333,358.691 L426.884,358.691 L405.18,269.159 z" fill="#AF3750"/>
        <path className="tr32" d="M309.977,358.691 L362.321,404.849 L376.332,358.691 z" fill="#E2445C"/>
        <path className="tr33" d="M304.293,425.633 L309.978,358.691 L362.321,404.849 z" fill="#AF3750"/>
        <path className="tr34" d="M362.321,404.849 L376.333,358.691 L426.884,358.691 z" fill="#C53D56"/>
        <path className="tr35" d="M304.293,425.632 L362.321,404.849 L376.042,455.068 z" fill="#D23F57"/>
      </g>
    </svg>
);
// tslint:enable

const triangles = 35;

const ColourChange = (index: number) => keyframes({
  from: {
    opacity: index / triangles
  },
  to: {
    opacity: 1 - index / triangles
  }
});

const Wrapper = styled('span')(
  Array(triangles).fill({}).map((_, index) => ({
    [`.tr${index + 1}`]: {
      animation: `${ColourChange(index)} 1s linear alternate infinite`,
    }
  }
)));

const AnimatedLogo: React.StatelessComponent = () => (
  <Wrapper>
    <Logo/>
  </Wrapper>
);

export default AnimatedLogo;

import * as React from 'react';
import styled from '@emotion/styled';
import { rhythm } from '../typography';

const _ResponsiveVideo = styled('div')({
  position: 'relative',
  width: '100%',
  height: 0,
  paddingBottom: '56.25%',
  marginTop: rhythm(1),
  iframe: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    border: 'none',
    overflow: 'hidden'
  }
});

const ResponsiveVideo: React.StatelessComponent<{ src: string }> = ({ src }) => (
  <_ResponsiveVideo>
    <iframe
      src={src}
      scrolling="no"
      frameBorder="0"
      allowFullScreen={true}
    />
  </_ResponsiveVideo>
);

export default ResponsiveVideo;

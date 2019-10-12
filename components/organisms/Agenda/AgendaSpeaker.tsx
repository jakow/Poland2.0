import React from 'react';
import styled from '@emotion/styled';
import { Header3, Header4 } from '../../atoms/Headers';
import { rhythm } from '../../typography';
import LazyImage from '../../atoms/LazyImage';
import { fill } from '../../../helpers/cloudinary';
import Speaker from '../../../types/Speaker';
import { breakpointMin } from '../../variables';

const Avatar = styled('div')({
  flex: 'none',
  display: 'inline-block',
  width: rhythm(3),
  height: rhythm(3),
  verticalAlign: 'middle',
  borderRadius: '50%',
  zIndex: 1,
  img: {
    borderRadius: '50%',
  },
});

const Name = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: rhythm(0.5),
  h3: {
    marginBottom: rhythm(0.25),
  },
});

const Wrapper = styled('li')({
  display: 'flex',
  alignItems: 'center',
  marginRight: rhythm(0.75),
  marginBottom: rhythm(1),
  textAlign: 'left',
  [breakpointMin('tablet')]: {
    flexBasis: '45%',
  },
});

const AgendaSpeaker: React.FunctionComponent<Speaker> = ({ name, organisation, photo }) => (
  <Wrapper>
    <Avatar>
      {photo ? (
        <LazyImage
          src={fill(photo.url, 120, 120, { gravity: 'face' })}
          placeholder={fill(photo.url, 32, 32, { gravity: 'face' })}
        />
      ) : (
        <LazyImage
          src="https://via.placeholder.com/120?text=?"
          placeholder="https://via.placeholder.com/32?text=?"
        />
      )}
    </Avatar>
    <Name>
      <Header4 bodyFont semiBold noMargin>{name}</Header4>
      <span>{organisation && organisation}</span>
    </Name>
  </Wrapper>
);

export default AgendaSpeaker;

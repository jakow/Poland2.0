import * as React from 'react';
import styled from '@emotion/styled';

import { rhythm } from 'components/typography';
import { EventSpeaker } from 'types/Agenda';
import LazyImage from 'components/LazyImage';
import { fill } from 'helpers/cloudinary';

const Avatar = styled('div')({
  flex: 'none',
  display: 'inline-block',
  width: rhythm(3),
  height: rhythm(3),
  verticalAlign: 'middle',
  borderRadius: '50%',
  zIndex: 1,
  img: {
    borderRadius: '50%'
  }
});

const Name = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: rhythm(0.5),
  h3: {
    marginBottom: rhythm(0.25)
  }
});

export const SpeakerList = styled('ul')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  flex: '1 0',
  alignItems: 'flex-start'
});

const Wrapper = styled('li')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: `${rhythm(1)} !important`,
  flex: '1 0 100%',
  flexBasis: '25%'
});

export const SpeakerItem: React.StatelessComponent<EventSpeaker> = ({ name, company, photo }) => (
  <Wrapper>
    <Avatar>
      <LazyImage
        src={fill(photo.secure_url, 120, 120, { gravity: 'face' })}
        placeholder={fill(photo.secure_url, 32, 32, { gravity: 'face' })}
      />
    </Avatar>
    <Name>
      <h3>{name}</h3>
      <h4>{company && company}</h4>
    </Name>
  </Wrapper>
);

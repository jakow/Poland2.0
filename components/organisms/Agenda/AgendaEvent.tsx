import { Icon } from '@blueprintjs/core';
import { css } from '@emotion/core';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import { AgendaEventType } from '../../../types/Agenda';
import { Header3, Header4 } from '../../atoms/Headers';
import { rhythm } from '../../typography';
import { breakpointMin, colors } from '../../variables';
import AgendaSpeaker from './AgendaSpeaker';

const Wrapper = styled('article')(
  {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginBottom: rhythm(1),
  },
);

const Row = styled('div')({
  display: 'flex',
});

const column = css({
  display: 'flex',
  flexDirection: 'column',
});

const Time = styled('div')(column, {
  flexBasis: rhythm(3),
  height: rhythm(2),
  [Header3 as any]: {
    lineHeight: '1.5rem',
  },
});

const Title = styled('div')(column, {
  marginLeft: rhythm(0.5),
  flex: 1,
  span: {
    marginBottom: rhythm(0.33),
    lineHeight: '1rem',
  },
  [Header4 as any]: {
    lineHeight: rhythm(1),
  },
});

const LearnMoreColumn = styled('aside')(column, {
  '.bp3-icon': {
    display: 'inline-block',
    [breakpointMin('tablet')]: {
      display: 'none',
    },
    cursor: 'pointer',
  },
  justifyContent: 'center',
  flexBasis: rhythm(1.75),
  alignItems: 'flex-end',
});

const Description = styled('div')<{ open?: boolean }>(
  props => ({
    width: '100%',
    textAlign: 'justify',
    overflow: 'hidden',
    p: {
      '&:first-of-type': {
        paddingTop: rhythm(0.5),
      },
    },
    maxHeight: props.open ? '4096px' : 0,
    [breakpointMin('tablet')]: {
      maxHeight: '100%',
    },
    transition: 'max-height 0.5s ease-in-out',
  }),
);

const Speakers = styled('ul')({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  margin: 0,
});

const Line = styled('div')<{ color?: string; }>(props => ({
  width: '100%',
  height: '100%',
  marginTop: 5,
  marginLeft: rhythm(0.66),
  borderTop: `3px solid ${props.color || colors.white}`,
}));

const Circle = styled('div')<{ color?: string; }>(props => ({
  position: 'relative',
  '&::before': {
    position: 'absolute',
    top: -6,
    content: '"\u25C9"',
    color: `${props.color || colors.white}`,
  },
}));

const AgendaEvent: React.FunctionComponent<AgendaEventType> = ({
  startTime, endTime, name, description, type, category, speakers,
}) => {
  const [open, toggleOpen] = useState(false);
  const LearnMore = (
    <Icon
      icon={!open ? 'more' : 'ungroup-objects'}
      color={`${colors.white}`}
      iconSize={20}
      onClick={() => toggleOpen(!open)}
    />
  );
  return (
    <Wrapper>
      {category && category.name && (
        <Row>
          <Circle color={category.color} />
          <Header4 style={{ marginLeft: rhythm(1) }}>{category.name}</Header4>
          <Line color={category.color} />
        </Row>
      )}
      <Row>
        <Time>
          <Header3 noMargin>
            {(new Date(startTime)).toLocaleTimeString('en-GB', {
              hour: 'numeric', minute: 'numeric', timeZone: 'UTC', hour12: false,
            })}
          </Header3>
          <span>
            {(new Date(endTime)).toLocaleTimeString('en-GB', {
              hour: 'numeric', minute: 'numeric', timeZone: 'UTC', hour12: false,
            })}
          </span>
        </Time>
        <Title>
          {type && <span>{type}</span>}
          <Header4 noMargin>{name}</Header4>
        </Title>
        {((description && description.length) || (speakers && speakers.length)) ? (
          <LearnMoreColumn>
            {LearnMore}
          </LearnMoreColumn>
        ) : null}
      </Row>
      <Description open={open}>
        <ReactMarkdown>{description}</ReactMarkdown>
        {speakers && speakers.length ? (
          <Speakers>
            {speakers.map((speaker, index) => <AgendaSpeaker {...speaker} key={index} />)}
          </Speakers>
        ) : null}
      </Description>
    </Wrapper>
  );
};

export default AgendaEvent;

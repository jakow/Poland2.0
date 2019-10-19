import { Icon } from '@blueprintjs/core';
import { css } from '@emotion/core';
import Color from 'color';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import { AgendaEventType } from '../../../types/Agenda';
import { Header3, Header4 } from '../../atoms/Headers';
import { rhythm } from '../../typography';
import { breakpointMin, colors, shadow } from '../../variables';
import AgendaSpeaker from './AgendaSpeaker';

const Wrapper = styled('article')<{ cardColor?: Color }>(
  props => ({
    padding: rhythm(0.75),
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginBottom: rhythm(1),
    backgroundColor: `${props.cardColor || colors.green.darken(0.55)}`,
  }),
  shadow,
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

const Title = styled('div')<{ compact?: boolean }>(column, props => ({
  marginLeft: !props.compact ? rhythm(0.5) : 0,
  flex: 1,
  span: {
    marginBottom: rhythm(0.33),
    lineHeight: '1rem',
  },
  [Header4 as any]: {
    lineHeight: rhythm(1),
  },
}));

const LearnMoreColumn = styled('aside')<{ compact?: boolean }>(column, props => ({
  '.bp3-icon': {
    display: 'inline-block',
    [breakpointMin('tablet')]: {
      display: !props.compact && 'none',
    },
    cursor: 'pointer',
  },
  justifyContent: 'center',
  flexBasis: rhythm(1.75),
  alignItems: 'flex-end',
}));

const Description = styled('div')<{ open?: boolean, compact?: boolean }>(
  props => ({
    width: '100%',
    textAlign: 'justify',
    overflow: 'hidden',
    p: {
      '&:first-of-type': {
        paddingTop: rhythm(0.5),
      },
      '&:last-of-type': {
        paddingBottom: 0,
      },
    },
    maxHeight: props.open ? '4096px' : 0,
    [breakpointMin('tablet')]: {
      maxHeight: !props.compact && '100%',
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

type Props = AgendaEventType & {
  compact?: boolean,
  cardColor?: Color,
};

const AgendaEvent: React.FunctionComponent<Props> = ({
  startTime, endTime, name, description, type, category, speakers, compact, cardColor,
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
    <>
      {category && category.name && (
        <Row>
          <Circle color={category.color} />
          <Header4 style={{ whiteSpace: 'nowrap', marginLeft: rhythm(1) }}>{category.name}</Header4>
          <Line color={category.color} />
        </Row>
      )}
      <Wrapper cardColor={cardColor}>
        <Row>
          {!compact && (
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
          )}
          <Title compact={compact}>
            {type && <span>{type}</span>}
            <Header4 noMargin>{name}</Header4>
          </Title>
          {((description && description.length) || (speakers && speakers.length)) ? (
            <LearnMoreColumn compact={compact}>
              {LearnMore}
            </LearnMoreColumn>
          ) : null}
        </Row>
        <Description open={open} compact={compact}>
          <ReactMarkdown>{description}</ReactMarkdown>
          {speakers && speakers.length ? (
            <Speakers>
              {speakers.map((speaker, index) => <AgendaSpeaker {...speaker} key={index} />)}
            </Speakers>
          ) : null}
        </Description>
      </Wrapper>
    </>
  );
};

export default AgendaEvent;

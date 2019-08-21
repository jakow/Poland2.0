import * as React from 'react';

import Markdown from 'react-markdown';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { colors, breakpointMin } from '../../variables';
import { rhythm, fat, dangerousSuperscripts } from '../../typography';
import Edition from '../../../types/Edition';
import { dateString } from '../../../helpers/date';
import { Header1, Header2 } from '../../atoms/Headers';

const angledEdge = css({
  position: 'relative',
  transform: 'translate(0, 0)',
  zIndex: 2,
  '&::after': {
    content: '""',
    zIndex: -1,
    background: 'inherit',
    position: 'absolute',
    display: 'block',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    top: 0,
    transform: 'skewY(-5deg)',
    transformOrigin: 'top right',
    [breakpointMin('tablet')]: {
      transform: 'skewX(-10deg)',
      transformOrigin: 'bottom right',
    },
  },
});

const column = css({
  backgroundColor: `${colors.white}`,
  position: 'relative',
});

const Carousel = styled('div')(column, {
  flex: '1 0 60%',
  [breakpointMin('desktopWide')]: {
    flex: '1 0 70%',
  },
  'video, img': {
    objectFit: 'cover',
    width: '100vw',
    [breakpointMin('tablet')]: {
      width: '100%',
      height: '100%',
    },
  },
});

const Content = styled('div')(column, angledEdge, {
  textAlign: 'justify',
  flex: '1 0 40%',
  [breakpointMin('desktopWide')]: {
    flex: '1 0 30%',
  },
});

const DatePlace = styled('h3')(fat, {
  color: `${colors.darkGray}`,
  margin: `0 0 ${rhythm(1)}`,
  display: 'flex',
  flexDirection: 'column',
  '& > *': {
    flex: 'none',
  },
  [breakpointMin('tablet')]: {
    flexDirection: 'row',
  },
});

const Header = styled('header')({
  textAlign: 'center',
  [breakpointMin('tablet')]: {
    textAlign: 'initial',
  },
  span: {
    backgroundColor: `${colors.white}`,
  },
});

const Padding = styled('div')({
  padding: `${rhythm(1)} ${rhythm(1)} 0`,
  [breakpointMin('tablet')]: {
    padding: `${rhythm(1)} 0 ${rhythm(0)} ${rhythm(1)}`,
  },
});

const Separator = styled('span')({
  position: 'relative',
  padding: `${rhythm(0.5)} 0`,
  [breakpointMin('tablet')]: {
    padding: `0 ${rhythm(0.5)}`,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: `${rhythm(0.5)}`,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: `${colors.mediumGray}`,
    width: '33%',
    height: 1,
    [breakpointMin('tablet')]: {
      height: rhythm(1),
      top: 0,
      bottom: 0,
      left: 'initial',
      transform: 'initial',
      width: 1,
    },
  },
});

const Wrapper = styled('section')({
  backgroundColor: `${colors.white}`,
  zIndex: 4,
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  [breakpointMin('tablet')]: {
    maxHeight: rhythm(20),
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});

interface Props {
  currentEdition?: Edition;
}

const Banner: React.StatelessComponent<Props> = ({ currentEdition }) => (
  <Wrapper>
    <Content>
      <Padding>
        <Header>
          <Header1 style={{ marginBottom: rhythm(0.25) }}>Poland 2.0 Summit</Header1>
          {currentEdition.name
            && <Header2 bold dangerouslySetInnerHTML={dangerousSuperscripts(currentEdition.name)} />
          }
          {currentEdition && (
            <DatePlace>
              <time dateTime={currentEdition.startDate}>
                {dateString(currentEdition.startDate, currentEdition.endDate)}
              </time>
              <Separator />
              {currentEdition.venue && <span>{currentEdition.venue.name}</span>}
            </DatePlace>
          )}
        </Header>
        <Markdown source={currentEdition.description} />
      </Padding>
    </Content>
    <Carousel>
      {currentEdition.coverPhoto && (
        currentEdition.coverPhoto.url.endsWith('.jpg')
        || currentEdition.coverPhoto.url.endsWith('.png'))
        && <img src={currentEdition.coverPhoto.url} alt="Graphical cover of this year's edition" />
      }
      {currentEdition.coverPhoto && currentEdition.coverPhoto.url.endsWith('.mp4')
        && (
          <video autoPlay loop muted playsInline>
            <source
              src={`${currentEdition.coverPhoto.url.slice(0, -4)}.webm`}
              type="video/webm"
            />
            <source
              src={currentEdition.coverPhoto.url}
              type="video/mp4"
            />
          </video>
        )
      }
    </Carousel>
  </Wrapper>
);

export default Banner;

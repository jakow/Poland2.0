import * as React from 'react';

import Swiper from 'react-id-swiper';
import Markdown from 'react-markdown';

import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { colors, breakpointMin } from '../../variables';
import { rhythm, fat } from '../../typography';
import Edition from '../../../types/Edition';
import walden from './walden';
import { limit } from '../../../helpers/cloudinary';
import { dateString } from '../../../helpers/date';

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
      transformOrigin: 'bottom right'
    }
  },
});

const column = css({
  backgroundColor: `${colors.white}`,
  flex: '1 0 50%',
  position: 'relative'
});

const Carousel = styled('div')(column, {
  minHeight: rhythm(9),
  [breakpointMin('tablet')]: {
    minHeight: 0
  },
  '.swiper-container': {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  '.swiper-pagination-bullet': {
    opacity: 1,
    backgroundColor: `${colors.white}`,
    boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.4)',
    '&.swiper-pagination-bullet-active': {
      backgroundColor: `${colors.red}`
    }
  }
});

const Content = styled('div')(column, angledEdge);

const DatePlace = styled('h3')(fat, {
  color: `${colors.darkGray}`,
  margin: `0 0 ${rhythm(1)}`,
  display: 'flex',
  flexDirection: 'column',
  '& > *': {
    flex: 'none'
  },
  [breakpointMin('tablet')]: {
    flexDirection: 'row'
  }
});

const Header = styled('header')({
  textAlign: 'center',
  [breakpointMin('tablet')]: {
    textAlign: 'initial'
  },
  span: {
    backgroundColor: `${colors.white}`
  }
});

const Image = styled('div')(walden, (props: { src: string }) => ({
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundOrigin: 'content-box',
  backgroundClip: 'content-box',
  backgroundPosition: 'center center',
  backgroundImage: `url(${props.src})`
}));

const Padding = styled('div')({
  padding: `${rhythm(1)} ${rhythm(1)} 0`,
  [breakpointMin('tablet')]: {
    padding: `${rhythm(1)} 0 ${rhythm(0)} ${rhythm(1)}`
  }
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
      width: 1
    }
  }
});

const _Banner = styled('section')({
  backgroundColor: `${colors.white}`,
  zIndex: 4,
  overflowX: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  [breakpointMin('tablet')]: {
    flexDirection: 'row',
    alignItems: 'stretch'
  }
});

const swiperProps = {
  loop: true,
  simulateTouch: false,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  speed: 500,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets'
  },
  a11y: {
    enabled: true
  },
};

interface Props {
  currentEdition?: Edition;
}

const Banner: React.StatelessComponent<Props> = ({ currentEdition }) => (
  <_Banner>
    <Content>
      <Padding>
        <Header>
          <h1>Poland 2.0 Summit</h1>
          {currentEdition && (
            <DatePlace>
              <time dateTime={currentEdition.startDate}>
                {dateString(currentEdition.startDate, currentEdition.endDate)}
              </time>
              <Separator/>
              {currentEdition.venue && <span>{currentEdition.venue.name}</span>}
            </DatePlace>
          )}
        </Header>
        <Markdown source={currentEdition.description}/>
      </Padding>
    </Content>
    <Carousel>
      <Swiper {...swiperProps}>
        {['ffoopf3pdr6xxft5pfel', 'tprdqpldylorpccqpmg0', 'DSC_0270n_rlkqba'] // default images
          .map((secure_url, index) => (
            <Image className="swiper-slide" key={index} src={limit(secure_url, 900)}/>
          ))
        }
      </Swiper>
    </Carousel>
  </_Banner>
);

/**
 * Requires Swiper stylesheet, available at
 * https://github.com/kidjp85/react-id-swiper#use-swiper-stylesheet-file-from-cdn
 */
export default Banner;

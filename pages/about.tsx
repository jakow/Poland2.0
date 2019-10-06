import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Container from '../components/atoms/Container';
import { Header1 } from '../components/atoms/Headers';
import { withBackground } from '../components/hoc';
import TeamMembers from '../components/organisms/TeamMembers';
import { navHeight } from '../components/organisms/TopNavigation';
import { breakpointMax, breakpointMin, colors } from '../components/variables';
import { DefaultPageProps } from './_app';
import { rhythm } from '../components/typography';

const informationWidth = 16;
const desktopExcessLeft = '((100vw - 1280px) / 2)';

const Text = styled('article')({
  width: rhythm(informationWidth),
  [breakpointMax('tabletLarge')]: {
    width: '100%',
  },
  p: {
    textAlign: 'justify',
  },
});

const Information = styled('div')({
  display: 'flex',
  img: {
    position: 'absolute',
    top: navHeight,
    opacity: 0.2,
    objectFit: 'cover',
    height: rhythm(19),
    left: 0,
    width: '100%',
    [breakpointMin('tabletLarge')]: {
      height: rhythm(32),
      left: rhythm(informationWidth + 3),
      width: `calc(100% - ${rhythm(informationWidth + 3)})`,
    },
    [breakpointMin('desktop')]: {
      left: `calc(${rhythm(informationWidth + 3)} + ${desktopExcessLeft})`,
      width: `calc(100% - ${rhythm(informationWidth + 3)} - ${desktopExcessLeft})`,
    },
  },
});

const Gradient = styled('div')({
  position: 'absolute',
  top: rhythm(18),
  [breakpointMin('tabletLarge')]: {
    top: rhythm(31),
  },
  left: 0,
  backgroundImage: `linear-gradient(180deg, transparent, ${colors.purple})`,
  width: '100%',
  height: rhythm(4),
  zIndex: 1,
});

const Wrapper = styled('section')({
  color: `${colors.white}`,
  paddingTop: rhythm(1),
  'h1, p': {
    position: 'relative',
    zIndex: 2,
  },
});

const About: NextPage<DefaultPageProps> = ({ currentEdition }) => (
  <Container>
    <Wrapper>
      <Head>
        <title>About - Poland 2.0 Summit</title>
      </Head>
      <Header1>About</Header1>
      <Information>
        <Text>
          <p>
            <strong>Progress defines future.</strong> Scientific and technological innovation shapes our everyday
            life. Some ask how can we see impact of something that is only coming on our lives.
            And we are here to show that innovation is the omnipresent, universal language capable
            of connecting diverse fields together.
          </p>
          <p>
            <strong>
              This {new Date(currentEdition.startDate).toLocaleString('en-GB', { month: 'long' }) },
            </strong> Poland 2.0 Summit will create a platform for students, public servants and professionals to
            engage in an inspiring discussion about the future direction of technology, innovation and sustainability.
            We will prove that some seemingly distinct fields like finance, health-care, gaming are in fact connected by
            one factor: spectacular breakthroughs by no other but Poles.
          </p>
          <p>
            <strong>Tomorrow may well be anybody’s guess,</strong> but we believe that the brilliant minds of today can
            take the future into their own hands and shape it.
          </p>
          <p>
            At <strong>Poland 2.0 Summit,</strong> you will have a unique chance to network with like-minded peers, meet
            the game-changing business players during lunches, workshops and more, learn about crucial changes across
            industries, and improve your career prospects, during this annual event.
          </p>
        </Text>
        <Gradient />
        <img src="https://res.cloudinary.com/dg1royeho/image/upload/v1570296453/DSC_8002_cqz2l8.jpg" alt="" />
      </Information>
      <Header1>Meet the Team</Header1>
    </Wrapper>
  </Container>
);

export default withBackground(About, colors.purple);

import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { DefaultPageProps } from './_app';
import TeamMembers from '../components/organisms/TeamMembers';
import {
  rhythm, Center, _fat, _bold,
} from '../components/typography';
import { colors } from '../components/variables';

const background = css({
  zIndex: 0,
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  minHeight: `calc(100vh - ${rhythm(3)})`,
});

const Banner = styled('div')({
  padding: `${rhythm(3)} 0 ${rhythm(1)}`,
  img: {
    maxHeight: rhythm(8),
  },
});

const Container = styled('div')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Content = styled('section')({
  padding: `0 ${rhythm(1)}`,
  zIndex: 2,
});

const Gradient = styled('div')(background, {
  background: `linear-gradient(180deg, ${colors.white.fade(0.75)}, white)`,
});

const Image = styled('div')(background, { // eslint-disable-next-line
  background: 'url("https://res.cloudinary.com/dg1royeho/image/upload/c_scale,q_70,w_1000/v1501759687/about-banner_izxi8y.png") no-repeat top center/cover',
});

export const Mission = styled('article')({
  margin: '0 auto',
  maxWidth: rhythm(32),
  textAlign: 'justify',
});

const About: React.FunctionComponent<DefaultPageProps> = ({ currentEdition }) => (
  <Container>
    <Head>
      <title>About - Poland 2.0 Summit</title>
    </Head>
    <Image />
    <Gradient />
    <Content>
      <Banner>
        <Center>
          <img src="/static/images/alpha.svg" property="image" alt="Logo" />
          <h1>Poland 2.0 Summit</h1>
        </Center>
      </Banner>
      <Mission property="description">
        <Center className={_fat}>
          <h1 className={`${_bold}`} style={{ marginBottom: rhythm(1.25) }}>Mission</h1>
          <h3><em>To overtake the future: innovation across industries</em></h3>
        </Center>
        <p>
          Progress defines future. Scientific and technological innovation shapes our everyday
          life. Some ask how can we see impact of something that is only coming on our lives.
          And we are here to show that innovation is the omnipresent, universal language capable
          of connecting diverse fields together.
        </p>
        <p>
          This October, <strong>Poland 2.0 Summit</strong> will create a platform for students,
          public servants and professionals to engage in an inspiring discussion about the future
          direction of technology, innovation and sustainability. We will prove that some seemingly
          distinct fields like finance, healthcare, gaming are in fact connected by one factor:
          spectacular breakthroughs by no other but Poles.
        </p>
        <p>
          Tomorrow may well be anybody’s guess, but we believe that the brilliant minds of today can
          take the future into their own hands and shape it. At <strong>Poland 2.0 Summit</strong>,
          you will have a unique chance to network with like-minded peers, meet the game-changing
          business players during lunches, workshops and more, learn about crucial changes across
          industries, and improve your career prospects, during this annual event.
        </p>
      </Mission>
      <TeamMembers teamMembers={currentEdition.teamMembers} />
    </Content>
  </Container>
);

export default About;

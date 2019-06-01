import React from 'react';
import { DefaultProps } from './_app';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { colors, rhythm, Center, fat, stripe, bold } from '@poland20/p20-components';
import TeamMembers from '../components/TeamMembers';
import { TeamMember } from '../components/types';

const background = css({
  zIndex: 0,
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  minHeight: `calc(100vh - ${rhythm(3)})`
});

const Banner = styled('div')({
  padding: `${rhythm(3)} 0 ${rhythm(1)}`,
  img: {
    maxHeight: rhythm(8)
  }
});

const Container = styled('div')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
});

const Content = styled('section')({
  padding: `0 ${rhythm(1)}`,
  zIndex: 2
});

const Gradient = styled('div')(background, {
  background: `linear-gradient(180deg, ${colors.white.fade(0.75)}, ${colors.white})`
});

const Image = styled('div')(background, { // tslint:disable-next-line
  background: 'url("https://res.cloudinary.com/dg1royeho/image/upload/c_scale,q_70,w_1000/v1501759687/about-banner_izxi8y.png") no-repeat top center/cover'
});

export const Mission = styled('article')({
  margin: '0 auto',
  maxWidth: rhythm(32),
  textAlign: 'justify'
});

const About: React.StatelessComponent<DefaultProps & { team: TeamMember[] }> = ({ team }) => (
  <Container>
    <Image/>
    <Gradient/>
    <Content vocab="http://schema.org/" typeof="Organization">
      <Banner>
        <Center>
          <img src="/static/images/alpha.svg" property="image" alt="Logo"/>
          <h1>Poland 2.0 Summit</h1>
        </Center>
      </Banner>
      <Mission property="description">
        <Center className={fat}>
          <h1 className={`${stripe} ${bold}`} style={{ marginBottom: rhythm(1.25) }}>Mission</h1>
          <h3><em>To overtake the future: innovation across industries</em></h3>
        </Center>
        <p> {/* TODO: Put this into Keystone */}
          Progress defines future. Scientific and technological innovation shapes our
          everyday life. Some may argue that it is difficult to see this impact on all aspects
          of our life. We could not disagree more. And we are here to show that innovation is the
          omnipresent, universal language capable of connecting diverse fields together.
        </p>
        <p>
          This November at Imperial College London, <strong>Poland 2.0</strong> will create a
          platform for students, researchers and professionals to engage in an inspiring
          discussion about the future direction of research, business and public policy. We
          will prove that some seemingly distinct fields like finance, healthcare, environment,
          or entertainment are in fact connected by one factor: spectacular breakthroughs. We
          also think that Poland, with its fast-paced market and brilliant minds, has potential
          to set the scene for such unique marriages.
        </p>
        <p>
          Tomorrow may well be anybody’s guess, but we believe that the brilliant minds of today
          can take the future into their own hands and shape it. At&nbsp;
          <strong>Poland 2.0 Summit</strong>, you will have a unique chance to network with
          like-minded peers, meet the game-changing business players, learn about crucial changes
          across industries, and improve your career prospects, while simply having an amazing time.
        </p>
      </Mission>
      <TeamMembers teamMembers={team}/>
    </Content>
  </Container>
);

export default About;

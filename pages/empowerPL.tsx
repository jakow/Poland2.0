import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { Header2 } from '../components/atoms/Headers';
import ResponsiveVideo from '../components/atoms/ResponsiveVideo';
import { withBackground } from '../components/hoc';
import {
  bold, Center, rhythm,
} from '../components/typography';
import { colors } from '../components/variables';
import { DefaultPageProps } from './_app';

const background = css({
  zIndex: 0,
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  minHeight: `calc(100vh - ${rhythm(3)})`,
});

const Banner = styled('div')({
  minHeight: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const Container = styled('div')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: `${colors.white}`,
  backgroundColor: `${colors.green}`,
});

const Content = styled('section')({
  padding: `0 ${rhythm(1)}`,
  zIndex: 2,
  minHeight: `calc(100vh - ${rhythm(3)})`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingBottom: rhythm(2),
  h1: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: rhythm(1.5),
    '&::before': {
      background: '#dfe344',
      maxWidth: rhythm(2),
      height: 4,
    },
  },
});

const Title = styled('h1')({
  fontSize: rhythm(2.33),
});

const Gradient = styled('div')(background, {
  background: `linear-gradient(180deg, ${colors.white.fade(0.75)}, ${colors.green})`,
});

const Image = styled('div')(background, { // eslint-disable-next-line
  background: 'url("https://res.cloudinary.com/dg1royeho/image/upload/v1533382268/building_ss2a1u.jpg") no-repeat top center/cover',
});

const Objective = styled('h1')(bold, {
  marginBottom: rhythm(1.25),
  paddingBottom: rhythm(0.5),
});

const Mission = styled('article')({
  margin: '0 auto',
  maxWidth: rhythm(32),
  textAlign: 'justify',
});

const empowerPL: NextPage<DefaultPageProps> = () => (
  <Container>
    <Image />
    <Gradient />
    <Content>
      <Banner>
        <Center>
          <Header2>Mentoring Programme</Header2>
          <Title>EmpowerPL</Title>
          <Header2 bodyFont normal>Poland 2.0 Summit <b>x</b> BCG</Header2>
        </Center>
      </Banner>
      <Mission>
        <Center><Objective>Objective</Objective></Center>
        <p>
          This year, we will be hosting the launch of the third edition of the <strong>#empowerPL</strong>
          &nbsp;programme, which was started in cooperation with the Boston Consulting Group and the Federation of
          Polish Societies in the UK during the third edition of Poland 2.0 Summit.
        </p>
        <p>
          The programme aims to build relationships between the best Polish managers and directors,
          and Polish students from the best universities in the UK and across Europe.
        </p>
        <p>
          While <strong>empowerPL</strong> is already the most significant mentoring programme in
          Poland, this initiative is expanded further to celebrate Poland’s&nbsp;
          <strong>100 years of independence</strong> with <strong>100 inspiring mentors</strong>.
        </p>
      </Mission> {/* eslint-disable-next-line */}
      <ResponsiveVideo src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FEmpowerPL%2Fvideos%2F2560842277469466" />
    </Content>
  </Container>
);

export default withBackground(empowerPL, colors.green);

import React from 'react';
import styled, { css } from 'react-emotion';
import withDefault, { DefaultProps } from './_app';
import { rhythm, colors, stripe, fat, Center, bold, ResponsiveVideo } from 'p20-components';
import { Mission } from './about';

const background = css({
  zIndex: 0,
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  minHeight: `calc(100vh - ${rhythm(3)})`
});

const Banner = styled('div')({
  minHeight: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
});

const bcgGreen = '#5fc090';

const Container = styled('div')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: `${colors.white}`,
  backgroundColor: bcgGreen
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
      height: 4
    }
  }
});

const Title = styled('h1')(fat, stripe, {
  fontSize: rhythm(3),
  paddingBottom: rhythm(1.5)
});

const Gradient = styled('div')(background, {
  background: `linear-gradient(180deg, ${colors.white.fade(0.75)}, ${bcgGreen})`
});

const Image = styled('div')(background, { // tslint:disable-next-line
  background: 'url("https://res.cloudinary.com/dg1royeho/image/upload/v1533382268/building_ss2a1u.jpg") no-repeat top center/cover'
});

const Objective = styled('h1')(stripe, bold, {
  marginBottom: rhythm(1.25),
  paddingBottom: rhythm(0.5),
  '&::before': {
    background: `${colors.white} !important`
  }
});

const empowerPL: React.StatelessComponent<DefaultProps> = () => (
  <Container>
    <Image/>
    <Gradient/>
    <Content>
      <Banner>
        <Center>
          <h2 style={{ fontWeight: 'bolder' }}>Mentoring Programme</h2>
          <Title>empowerPL</Title>
          <h2>Poland 2.0 <b>x</b> BCG</h2>
        </Center>
      </Banner>
      <Mission property="description">
        <Center className={fat}>
          <Objective>Objective</Objective>
        </Center>
        <p>
          This year, we will launch the second edition of the <strong>empowerPL</strong> programme,
          which was started in cooperation with the Boston Consulting Group during last year’s
          Poland 2.0 Summit.
        </p>
        <p>
          The programme aims to build relationships between the best Polish managers and directors,
          and Polish students from the best universities in the UK and France.
        </p>
        <p>
          While <strong>empowerPL</strong> is already the most significant mentoring programme in
          Poland, we aim to expand this initiative further to celebrate Poland’s&nbsp;
          <strong>100 years of independence</strong> with <strong>100 inspiring mentors</strong>.
        </p>
      </Mission> {/* tslint:disable-next-line */}
      <ResponsiveVideo src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FBCGinPoland%2Fvideos%2F2853963694617122"/>
    </Content>
  </Container>
);

export default withDefault(empowerPL);

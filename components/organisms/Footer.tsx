import React from 'react';
import styled from '@emotion/styled';
import SimpleIcons from 'simple-icons-react-component';
import { rhythm, Anchor } from '../typography';
import { breakpointMax, colors, breakpointMin } from '../variables';
import { Urls } from '../../types/ContentControl';

const Container = styled('footer')({
  background: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center center', // eslint-disable-next-line
  backgroundImage: 'url("https://res.cloudinary.com/dg1royeho/image/upload/c_scale,w_1024/v1498041997/footer-img2_afjcgn.jpg")',
  padding: `${rhythm(2)} ${rhythm(1)}`,
});

const Credits = styled('small')({
  lineHeight: rhythm(1),
  textAlign: 'center',
});

const Legal = styled('div')({
  display: 'flex',
  [breakpointMax('mobile')]: {
    '& > *': {
      flexBasis: '33.3%',
      textAlign: 'center',
    },
  },
});

const Separator = styled('div')({
  height: 1,
  width: rhythm(8),
  marginTop: rhythm(1),
  backgroundColor: `${colors.gray}`,
});

const Social = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const socialMedia = ['facebook', 'linkedin', 'instagram', 'github'].map(media => ({
  [`&.${media}`]: {
    backgroundImage: `url('https://unpkg.com/simple-icons@latest/icons/${media}.svg')`,
  },
}));

const Icon = styled('a')(
  {
    width: rhythm(2),
    height: rhythm(2),
    padding: rhythm(0.45),
    display: 'inline-block',
    backgroundColor: `${colors.red}`,
    '& + &': {
      marginLeft: rhythm(0.5),
      [breakpointMin('tablet')]: {
        marginLeft: rhythm(0.75),
      },
    },
  },
);

const Footer: React.FunctionComponent<Urls> = ({
  bylawUrl, privacyPolicyUrl, facebookUrl, linkedinUrl, instagramUrl, githubUrl,
}) => (
  <Container>
    <Social>
      {facebookUrl && (
        <Icon
          href={facebookUrl}
          rel="noopener noreferrer"
          target="_blank"
          title="Facebook"
        >
          <SimpleIcons name="Facebook" color={`${colors.white}`} />
        </Icon>
      )}
      {instagramUrl && (
        <Icon
          href={instagramUrl}
          title="Instagram"
          rel="noopener noreferrer"
          target="_blank"
        >
          <SimpleIcons name="Instagram" color={`${colors.white}`} />
        </Icon>
      )}
      {linkedinUrl && (
        <Icon
          href={linkedinUrl}
          rel="noopener noreferrer"
          target="_blank"
          title="LinkedIn"
        >
          <SimpleIcons name="LinkedIn" color={`${colors.white}`} />
        </Icon>
      )}
      {githubUrl && (
        <Icon
          href={githubUrl}
          title="GitHub"
          rel="noopener noreferrer"
          target="_blank"
        >
          <SimpleIcons name="GitHub" color={`${colors.white}`} />
        </Icon>
      )}
    </Social>
    <Separator />
    <Legal>
      {bylawUrl && <Anchor href={bylawUrl}>By-law for Poland 2.0 Summit</Anchor>}
      {privacyPolicyUrl
        && (
          <Anchor href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </Anchor>
        )
      }
      <Anchor href="mailto:contact@poland20.com">Contact</Anchor>
    </Legal>
    <Credits>
      <span>&#169; {(new Date()).getFullYear()} Poland 2.0 Summit</span>
      <p>
        Created by&nbsp;
        <a href="https://github.com/arutr" target="_blank" rel="noopener noreferrer">Artur Komoter</a> and&nbsp;
        <a href="https://github.com/jakow" target="_blank" rel="noopener noreferrer">Jakub Kowalczyk</a>
      </p>
    </Credits>
  </Container>
);

export default Footer;

import React from 'react';
import styled from '@emotion/styled';
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
  backgroundPosition: 'center center', // tslint:disable-next-line
  backgroundImage: `url('https://res.cloudinary.com/dg1royeho/image/upload/c_scale,w_1024/v1498041997/footer-img2_afjcgn.jpg')`,
  padding: `${rhythm(2)} ${rhythm(1)}`
});

const Credits = styled('small')({
  lineHeight: rhythm(1),
  textAlign: 'center'
});

const Legal = styled('div')({
  display: 'flex',
  [breakpointMax('mobile')]: {
    '& > *': {
      flexBasis: '33.3%',
      textAlign: 'center'
    }
  }
});

const Separator = styled('div')({
  height: 1,
  width: rhythm(8),
  marginTop: rhythm(1),
  backgroundColor: `${colors.mediumGray}`
});

const Social = styled('div')({
  display: 'flex',
  justifyContent: 'center'
});

const socialMedia =
  ['facebook', 'linkedin', 'instagram', 'github'].map(media => ({
    [`&.${media}`]: {
      backgroundImage: `url('https://unpkg.com/simple-icons@latest/icons/${media}.svg')`
    }
  }));

const Icon = styled('a')(
  {
    width: rhythm(2),
    height: rhythm(2),
    display: 'inline-block',
    backgroundSize: `auto ${rhythm(1)}`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: `${colors.white}`,
    '& + &': {
      marginLeft: rhythm(0.5),
      [breakpointMin('tablet')]: {
        marginLeft: rhythm(0.75)
      }
    }
  },
  ...socialMedia
);

const Footer: React.StatelessComponent<Urls> = ({
  bylawUrl, privacyPolicyUrl, facebookUrl, linkedinUrl, instagramUrl, githubUrl
}) => (
  <Container>
    <Social>
      {facebookUrl &&
        <Icon
          className="facebook"
          href={facebookUrl}
          rel="noopener noreferrer"
          target="_blank"
          title="Facebook"
        />
      }
      {githubUrl &&
        <Icon
          className="github"
          href={githubUrl}
          title="GitHub"
          rel="noopener noreferrer"
          target="_blank"
        />
      }
      {instagramUrl &&
        <Icon
          className="instagram"
          href={instagramUrl}
          title="Instagram"
          rel="noopener noreferrer"
          target="_blank"
        />
      }
      {linkedinUrl &&
        <Icon
          className="linkedin"
          href={linkedinUrl}
          rel="noopener noreferrer"
          target="_blank"
          title="LinkedIn"
        />
      }
    </Social>
    <Separator/>
    <Legal>
      {bylawUrl && <Anchor href={bylawUrl}>By-law for Poland 2.0</Anchor>}
      {privacyPolicyUrl &&
        <Anchor href={privacyPolicyUrl} label="Privacy Policy" target="_blank">
          Privacy Policy
        </Anchor>
      }
      <Anchor href="mailto:contact@poland20.com">Contact</Anchor>
    </Legal>
    <Credits>
      &#169; {(new Date()).getFullYear()} Poland 2.0<br/>
      Created by&nbsp;
      <a href="https://github.com/jakow" target="_blank" rel="noopener">Jakub Kowalczyk</a><br/>
      Maintained by&nbsp;
      <a href="https://github.com/arutr" target="_blank" rel="noopener">Artur Komoter</a>
    </Credits>
  </Container>
);

export default Footer;

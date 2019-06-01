import React from 'react';
import styled from '@emotion/styled';
import Markdown from 'react-markdown';
import {
  colors, rhythm, breakpointMin, Anchor, Modal, breakpointMax
} from '@poland20/p20-components';
import ModalCard from './ModalCard';

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
  ['facebook', 'linkedin', 'twitter', 'youtube', 'vimeo'].map(media => ({
    [`&.${media}`]: {
      backgroundImage: `url('/static/images/icons/${media}.svg')`
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

const PrivacyPolicy = styled('div')({
  textAlign: 'initial',
  'h1, h2, h3, h4': {
    fontWeight: 'bold',
    margin: `${rhythm(0.75)} 0`
  },
  'h1:first-child': {
    textAlign: 'center',
    marginTop: 0
  },
  'p, ul, ol': {
    marginTop: rhythm(0.25),
    marginBottom: rhythm(0.25)
  },
  hr: {
    margin: `${rhythm(1)} 0`
  },
  del: {
    textDecoration: 'underline'
  }
});

interface Props {
  bylawLink: string;
  privacyPolicy: { md: string };
  facebookUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  videoChannelUrl?: string;
}

const Footer: React.StatelessComponent<Props> = ({
  bylawLink, privacyPolicy, facebookUrl, linkedinUrl, twitterUrl, videoChannelUrl
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
      {linkedinUrl &&
        <Icon
          className="linkedin"
          href={linkedinUrl}
          rel="noopener noreferrer"
          target="_blank"
          title="LinkedIn"
        />
      }
      {twitterUrl &&
        <Icon
          className="twitter"
          href={twitterUrl}
          title="Twitter"
          rel="noopener noreferrer"
          target="_blank"
        />
      }
      {videoChannelUrl && videoChannelUrl.includes('youtu') &&
        <Icon
          className="youtube"
          href={videoChannelUrl}
          title="YouTube"
          rel="noopener noreferrer"
          target="_blank"
        />
      }
      {videoChannelUrl && videoChannelUrl.includes('vimeo') &&
        <Icon
          className="vimeo"
          href={videoChannelUrl}
          title="Vimeo"
          rel="noopener noreferrer"
          target="_blank"
        />
      }
    </Social>
    <Separator/>
    <Legal>
      <Anchor href={bylawLink}>By-law for Poland 2.0</Anchor>
      <Modal trigger={<Anchor>Privacy Policy</Anchor>} label="Privacy Policy">
        <ModalCard>
          <PrivacyPolicy>
            <Markdown escapeHtml={false} linkTarget="_blank">
              {privacyPolicy.md}
            </Markdown>
          </PrivacyPolicy>
        </ModalCard>
      </Modal>
      {/* <Anchor
        href="/static/privacy-policy.pdf"
        label="Privacy Policy"
        target="_blank"
      >
        Privacy Policy
      </Anchor> */}
      <Anchor href="mailto:contact@poland20.com">Contact</Anchor>
    </Legal>
    <Credits>
      &#169; {(new Date()).getFullYear()} Poland 2.0<br/>
      Created by&nbsp;
      <a href="https://github.com/jakow" target="_blank" rel="noopener">Jakub Kowalczyk</a><br/>
      Maintained by <a href="mailto:artur@komoter.pl">Artur Komoter</a>
    </Credits>
  </Container>
);

export default Footer;

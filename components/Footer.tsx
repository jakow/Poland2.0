import React from 'react';
import styled from 'react-emotion';
import { colors, rhythm, breakpointMin, Anchor, Modal } from 'p20-components';

const Background = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center center', // tslint:disable-next-line
  backgroundImage: `url('https://res.cloudinary.com/dg1royeho/image/upload/c_scale,w_1024/v1498041997/footer-img2_afjcgn.jpg')`
});

const Container = styled('footer')({
  background: 'white',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative'
});

const Credits = styled('small')({
  lineHeight: rhythm(1),
  textAlign: 'center'
});

const Foreground = styled('div')({
  zIndex: 101, // for modals to appear on top
  padding: `${rhythm(2)} ${rhythm(1)}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
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

interface Props {
  bylawLink: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  videoChannelUrl?: string;
}

const Footer: React.StatelessComponent<Props> = ({
  bylawLink, facebookUrl, linkedinUrl, twitterUrl, videoChannelUrl
}) => (
  <Container>
    <Background/>
    <Foreground>
      <Social>
        {facebookUrl && <Icon className="facebook" href={facebookUrl} title="Facebook"/>}
        {linkedinUrl && <Icon className="linkedin" href={linkedinUrl} title="LinkedIn"/>}
        {twitterUrl && <Icon className="twitter" href={twitterUrl} title="Twitter"/>}
        {videoChannelUrl && videoChannelUrl.includes('youtu') &&
          <Icon className="youtube" href={videoChannelUrl} title="YouTube"/>}
        {videoChannelUrl && videoChannelUrl.includes('vimeo') &&
          <Icon className="vimeo" href={videoChannelUrl} title="Vimeo"/>}
      </Social>
      <Separator/>
      <div>
        <Anchor href={bylawLink}>By-law for Poland 2.0</Anchor>
        <Modal trigger={<Anchor>Privacy Policy</Anchor>} label="Privacy Policy">
          {/* TODO */}
        </Modal>
        <Anchor href="mailto:contact@poland20.com">Contact</Anchor>
      </div>
      <Credits>
        &#169; {(new Date()).getFullYear()} Poland 2.0<br/>
        Created by&nbsp;
        <a href="https://github.com/jakow" target="_blank" rel="noopener">Jakub Kowalczyk</a><br/>
        Maintained by <a href="mailto:artur@komoter.pl">Artur Komoter</a>
      </Credits>
    </Foreground>
  </Container>
);

export default Footer;

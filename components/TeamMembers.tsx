import React from 'react';
import Markdown from 'react-markdown';
import styled from '@emotion/styled';
import ModalCard from './ModalCard';
import { SmallMarginBottom } from './Speakers';
import { breakpointMin, colors } from './variables';
import { bold, fat, stripe, rhythm, Center } from './typography';
import Card, { CardList } from './Card';
import Container from './Container';
import Modal from './Modal';
import { fill } from '../helpers/cloudinary';
import TeamMember from '../types/TeamMember';

const LearnMore = styled('small')({
  [breakpointMin('tablet')]: {
    display: 'none'
  }
});

const Title = styled('h1')(bold, fat, stripe);

const Subtitle = styled('h2')();

const Wrapper = styled('section')({
  paddingBottom: rhythm(0.5),
  'li > div:nth-of-type(2)': {
    display: 'flex',
    flexDirection: 'column',
    minHeight: rhythm(8)
  },
  'li > footer': {
    minHeight: rhythm(3)
  }
});

const Icon = styled('a')({
  width: rhythm(0.75),
  height: rhythm(0.75),
  display: 'inline-block',
  backgroundSize: `auto ${rhythm(0.75)}`,
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  '& + &': {
    marginLeft: rhythm(0.5),
    [breakpointMin('tablet')]: {
      marginLeft: rhythm(0.75)
    }
  },
  '&.linkedin': {
    backgroundImage: 'url("/static/images/icons/linkedin.svg")'
  },
  '&.lnr': {
    textDecoration: 'none',
    color: `${colors.dark}`,
    fontSize: rhythm(0.75)
  }
});

const H3 = SmallMarginBottom.withComponent('h3');

const memberCard = (member: TeamMember, index?: number) => (
  <Card
    key={index}
    image={fill(member.photo.url, 300, 300, { gravity: 'faces' })}
    imagePreview={fill(member.photo.url, 32, 32, { gravity: 'faces' })}
    footer={(
      <React.Fragment>
        {member.position}<br/>
        {index ? null : <LearnMore>Tap on the image to learn more...</LearnMore>}
      </React.Fragment>
    )}
  >
    <H3>{member.name}</H3>
    <h4 style={{ flexGrow: 1 }}>{member.position && member.position}</h4>
    <div>
      {member.linkedin &&
        <Icon
          className="linkedin"
          href={member.linkedin}
          rel="noopener noreferrer"
          target="_blank"
          title={`${member.name}'s LinkedIn`}
        />
      }
      {member.email &&
        <Icon
          className="lnr lnr-envelope"
          href={`mailto:${member.email}`}
          rel="noopener noreferrer"
          target="_blank"
          title={`${member.name}'s e-mail`}
        />
      }
    </div>
  </Card>
);

interface Props {
  teamMembers: TeamMember[];
  isInSubcategory?: boolean;
}

const TeamMembers: React.StatelessComponent<Props> =
  ({ teamMembers, isInSubcategory }) => (
    <Wrapper id="team">
      <Container>
        <Center>
          {!isInSubcategory ? <Title>Team</Title>
                            : <Subtitle>Team</Subtitle>
          }
          <CardList>
            {teamMembers && teamMembers.map((member, index) => (
              member.description ?
                <Modal
                  key={index}
                  trigger={memberCard(member)}
                  label={`Learn more about ${member.name}`}
                >
                  <ModalCard>
                    <SmallMarginBottom>{member.name}</SmallMarginBottom>
                    <p>
                      <strong>
                        {member.position}{member.position && `, ${member.position}`}
                      </strong>
                    </p>
                    <Markdown>{member.description}</Markdown>
                  </ModalCard>
                </Modal>
              : memberCard(member, index)
            ))}
          </CardList>
        </Center>
      </Container>
    </Wrapper>
  );

export default TeamMembers;

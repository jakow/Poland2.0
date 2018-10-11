import React from 'react';
import Markdown from 'react-markdown';
import styled, { css } from 'react-emotion';
import {
  Container,
  rhythm,
  Center,
  bold,
  fat,
  stripe,
  CardList,
  Card,
  fill,
  Modal,
  breakpointMin,
  colors
} from '@poland20/p20-components';
import ModalCard from './ModalCard';
import { smallMarginBottom } from './Speakers';
import { TeamMember } from './types';

const LearnMore = styled('small')({
  [breakpointMin('tablet')]: {
    display: 'none'
  }
});

const Title = styled('h1')(bold, fat, stripe);

const Subtitle = styled('h2')();

const Wrapper = styled('section')({
  paddingBottom: rhythm(0.5),
  'li > div:nth-child(2)': {
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

const memberCard = (member: TeamMember, index?: number) => (
  <Card
    key={index}
    image={fill(member.photo.secure_url, 300, 300, { gravity: 'faces' })}
    imagePreview={fill(member.photo.secure_url, 32, 32, { gravity: 'faces' })}
    footer={(
      <React.Fragment>
        {member.position}<br/>
        {index ? null : <LearnMore>Tap on the image to learn more...</LearnMore>}
      </React.Fragment>
    )}
  >
    <h3 className={smallMarginBottom}>{member.name}</h3>
    <h4 style={{ flexGrow: 1 }}>{member.occupation && member.occupation}</h4>
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
              member.description.md ?
                <Modal
                  key={index}
                  trigger={memberCard(member)}
                  label={`Learn more about ${member.name}`}
                >
                  <ModalCard>
                    <h1 className={smallMarginBottom}>{member.name}</h1>
                    <p>
                      <strong>
                        {member.position}{member.occupation && `, ${member.occupation}`}
                      </strong>
                    </p>
                    <Markdown>{member.description.md}</Markdown>
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

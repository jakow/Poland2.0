import React from 'react';
import styled from '@emotion/styled';
import SimpleIcons from 'simple-icons-react-component';
import { Header3, Header4 } from '../atoms/Headers';
import { breakpointMin, colors } from '../variables';
import {
  bold, fat, rhythm, Center,
} from '../typography';
import Card, { CardList } from '../molecules/Card';
import Container from '../atoms/Container';
import { fill } from '../../helpers/cloudinary';
import TeamMember from '../../types/TeamMember';

const Title = styled('h1')(bold, fat);

const Wrapper = styled('section')({
  paddingBottom: rhythm(0.5),
  'li > div:nth-of-type(2)': {
    display: 'flex',
    flexDirection: 'column',
    minHeight: rhythm(8)
  },
  'li > footer': {
    minHeight: rhythm(3),
  },
});

const Icon = styled('a')({
  width: rhythm(0.75),
  height: rhythm(0.75),
  display: 'inline-block',
  textDecoration: 'none',
  color: `${colors.dark}`,
  fontWeight: 'bold',
  '& + &': {
    marginLeft: rhythm(0.5),
    [breakpointMin('tablet')]: {
      marginLeft: rhythm(0.75),
    },
  },
  svg: {
    pointerEvents: 'none',
  },
});

const memberCard = (member: TeamMember, index?: number) => (
  <Card
    key={index}
    image={fill(member.photo.url, 300, 300, { gravity: 'faces' })}
    imagePreview={fill(member.photo.url, 32, 32, { gravity: 'faces' })}
    footer={member.position}
    width={rhythm(8)}
  >
    <Header3 bodyFont semiBold style={{ marginBottom: rhythm(0.25) }}>{member.name}</Header3>
    <Header4 bodyFont normal style={{ flexGrow: 1 }}>{member.organisation}</Header4>
    <div>
      {member.linkedin && (
        <Icon
          className="linkedin"
          href={member.linkedin}
          rel="noopener noreferrer"
          target="_blank"
          title={`${member.name}'s LinkedIn`}
        >
          <SimpleIcons name="LinkedIn" color={`${colors.red}`} />
        </Icon>
      )}
      {member.email && (
        <Icon
          className="email"
          href={`mailto:${member.email}`}
          rel="noopener noreferrer"
          target="_blank"
          title={`${member.name}'s e-mail`}
        >
          <SimpleIcons name="Mail.Ru" color={`${colors.red}`} />
        </Icon>
      )}
    </div>
  </Card>
);

interface Props {
  teamMembers: TeamMember[];
}

const TeamMembers: React.FunctionComponent<Props> = ({ teamMembers }) => (
  <Wrapper id="team">
    <Container>
      <Center>
        <Title>Team</Title>
        <CardList>
          {teamMembers && teamMembers.map((member, index) => memberCard(member, index))}
        </CardList>
      </Center>
    </Container>
  </Wrapper>
);

export default TeamMembers;

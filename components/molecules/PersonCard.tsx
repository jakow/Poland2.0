import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import SimpleIcons from 'simple-icons-react-component';
import Color from 'color';
import React, { useState } from 'react';
import { fill } from '../../helpers/cloudinary';
import Speaker from '../../types/Speaker';
import TeamMember from '../../types/TeamMember';
import { Header3 } from '../atoms/Headers';
import LazyImage from '../atoms/LazyImage';
import {
  breakpointMax, breakpointMin, colors, shadowLight, transition,
} from '../variables';
import { Anchor, rhythm } from '../typography';

const cardHeight = 7.5;

const Wrapper = styled('li')<{ cardColor?: Color, open?: boolean }>(
  props => ({
    display: 'flex',
    flexDirection: 'column',
    maxHeight: props.open ? '4096px' : rhythm(cardHeight),
    backgroundColor: `${props.cardColor || colors.red}`,
    color: `${colors.white}`,
  }),
  shadowLight,
);

const Information = styled('div')({
  display: 'flex',
  height: 'inherit',
  img: {
    objectFit: 'cover',
    [breakpointMax('mobile')]: {
      width: rhythm(cardHeight - 3),
    },
    width: rhythm(cardHeight - 2),
    height: rhythm(cardHeight),
  },
  '& > div:first-of-type': {
    minWidth: rhythm(cardHeight - 2),
    [breakpointMax('mobile')]: {
      minWidth: rhythm(cardHeight - 3),
    },
    height: rhythm(cardHeight),
  },
});

const Details = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: rhythm(0.5),
  p: {
    marginBottom: 0,
  },
});

const Links = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  marginLeft: 'auto',
  [Anchor as any]: {
    [breakpointMax('mobile')]: {
      display: 'none',
    },
    minWidth: rhythm(4.33),
    color: `${colors.gray}`,
    marginRight: rhythm(1.5),
  },
});

const Description = styled('article')<{ open?: boolean }>(
  props => ({
    width: '100%',
    textAlign: 'justify',
    overflow: 'hidden',
    p: {
      padding: `0 ${rhythm(0.75)}`,
      '&:first-of-type': {
        paddingTop: rhythm(0.75),
      },
      '&:last-of-type': {
        paddingBottom: rhythm(0.75),
      },
    },
    maxHeight: props.open ? '4096px' : 0,
    transition: 'max-height 1s ease-in-out',
  }),
);

const Position = styled('p')({
  marginTop: 'auto',
  fontWeight: 600,
  textDecoration: 'uppercase',
});

const Icon = styled('a')({
  width: rhythm(0.75),
  height: rhythm(0.75),
  margin: rhythm(0.25),
  marginRight: rhythm(1.25),
  textDecoration: 'none',
  svg: {
    pointerEvents: 'none',
  },
});

interface Props {
  person: Speaker | TeamMember;
  color?: Color;
}

const PersonCard: React.FunctionComponent<Props> = ({ person, color }) => {
  const [open, toggleOpen] = useState(false);
  return (
    <Wrapper cardColor={color} open={open}>
      <Information>
        <LazyImage
          src={fill(person.photo.url, 256, 256, { gravity: 'faces' })}
          placeholder={fill(person.photo.url, 32, 32, { gravity: 'faces' })}
        />
        <Details>
          <Header3 noMargin>{person.name}</Header3>
          <p>{person.organisation}</p>
          <Position>{(person as Speaker).occupation || (person as TeamMember).position}</Position>
        </Details>
        {(person as TeamMember).email && (
          <Links>
            <Icon
              href={`mailto:${(person as TeamMember).email}`}
              rel="noopener noreferrer"
              target="_blank"
              title={`${person.name}'s e-mail`}
            >
              <SimpleIcons name="Mail.Ru" color={`${colors.white}`} />
            </Icon>
            {(person as TeamMember).linkedin && (
              <Icon
                href={(person as TeamMember).linkedin}
                rel="noopener noreferrer"
                target="_blank"
                title={`${(person as TeamMember).name}'s LinkedIn`}
              >
                <SimpleIcons name="LinkedIn" color={`${colors.white}`} />
              </Icon>
            )}
            {(person as TeamMember).instagram && (
              <Icon
                href={(person as TeamMember).instagram}
                rel="noopener noreferrer"
                target="_blank"
                title={`${(person as TeamMember).name}'s Instagram`}
              >
                <SimpleIcons name="Instagram" color={`${colors.white}`} />
              </Icon>
            )}
          </Links>
        )}
        {person.description && (
          <Links>
            <Anchor onClick={() => toggleOpen(!open)}>
              {!open ? 'Learn more...' : 'Collapse...'}
            </Anchor>
          </Links>
        )}
      </Information>
      <Description open={open}>
        <ReactMarkdown>
          {person.description}
        </ReactMarkdown>
      </Description>
    </Wrapper>
  );
};

export default PersonCard;

import React from 'react';
import Markdown from 'react-markdown';
import styled from '@emotion/styled';
import ModalCard from './ModalCard';
import { SpeakerCategories, Speaker } from './types';
import { breakpointMin } from './variables';
import { bold, fat, stripe, rhythm, Center } from './typography';
import Card, { CardList } from './Card';
import Container from './Container';
import Modal from './Modal';
import { fill } from 'helpers/cloudinary';

const LearnMore = styled('small')({
  [breakpointMin('tablet')]: {
    display: 'none'
  }
});

const Title = styled('h1')(bold, fat, stripe);

const Subtitle = styled('h2')();

const Wrapper = styled('section')({
  position: 'relative',
  paddingBottom: rhythm(0.5)
});

export const SmallMarginBottom = styled('h1')({
  marginBottom: rhythm(0.25),
  wordWrap: 'normal'
});
const H3 = SmallMarginBottom.withComponent('h3');

const speakerCard = (speaker: Speaker, index?: number) => (
  <Card
    key={index}
    image={fill(speaker.photo.secure_url, 300, 300, { gravity: 'faces' })}
    imagePreview={fill(speaker.photo.secure_url, 32, 32, { gravity: 'faces' })}
    footer={(
      <React.Fragment>
        {speaker.position}<br/>
        {index ? '' : <LearnMore>Tap on the image to learn more...</LearnMore>}
      </React.Fragment>
    )}
  >
    <Center>
      <H3>{speaker.name}</H3>
      <h4>{speaker.company && speaker.company}</h4>
    </Center>
  </Card>
);

interface FlatProps {
  speakers: Speaker[];
  isInSubcategory?: boolean;
}

export const SpeakersFlat: React.StatelessComponent<FlatProps> =
  ({ speakers, isInSubcategory }) => (
    <Wrapper id="speakers">
      <Container>
        <Center>
          {!isInSubcategory ? <Title>Speakers</Title>
                            : <Subtitle>Speakers</Subtitle>
          }
        </Center>
          <CardList>
            {speakers && speakers.length > 0 &&
              speakers.map((speaker, index) =>
                speaker.description.md ?
                  <Modal
                    key={index}
                    trigger={speakerCard(speaker)}
                    label={`Learn more about ${speaker.name}`}
                  >
                    <ModalCard>
                      <SmallMarginBottom>{speaker.name}</SmallMarginBottom>
                      <p>
                        <strong>
                          {speaker.position}{speaker.company && `, ${speaker.company}`}
                        </strong>
                      </p>
                      <Markdown>{speaker.description.md}</Markdown>
                    </ModalCard>
                  </Modal>
                : speakerCard(speaker, index)
              )
            }
          </CardList>
      </Container>
    </Wrapper>
);

const Speakers: React.StatelessComponent<{ speakerCategories: SpeakerCategories }> =
  ({ speakerCategories }) => (
    <Wrapper id="speakers">
      <Container>
        <Center><Title>Speakers</Title></Center>
          {speakerCategories && speakerCategories.map((category, index) => (
            <React.Fragment key={index}>
              <Center><h2>{category.displayName}</h2></Center>
              <CardList>
                {category.speakers && category.speakers.length > 0 &&
                  category.speakers.map((speaker, index) =>
                    speaker.description.md ?
                      <Modal
                        key={index}
                        trigger={speakerCard(speaker)}
                        label={`Learn more about ${speaker.name}`}
                      >
                        <ModalCard>
                          <SmallMarginBottom>{speaker.name}</SmallMarginBottom>
                          <p>
                            <strong>
                              {speaker.position}{speaker.company && `, ${speaker.company}`}
                            </strong>
                          </p>
                          <Markdown>{speaker.description.md}</Markdown>
                        </ModalCard>
                      </Modal>
                    : speakerCard(speaker, index)
                  )
                }
              </CardList>
            </React.Fragment>
          ))}
      </Container>
    </Wrapper>
);

export default Speakers;

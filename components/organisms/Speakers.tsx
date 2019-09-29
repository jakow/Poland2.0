import React from 'react';
import Markdown from 'react-markdown';
import styled from '@emotion/styled';
import { Header3, Header4 } from '../atoms/Headers';
import ModalCard from '../molecules/ModalCard';
import { breakpointMin } from '../variables';
import {
  bold, fat, rhythm, Center,
} from '../typography';
import Card, { CardList } from '../molecules/Card';
import Container from '../atoms/Container';
import Modal from '../molecules/Modal';
import { fill } from '../../helpers/cloudinary';
import Speaker from '../../types/Speaker';
import SpeakerCategory from '../../types/SpeakerCategory';

const LearnMore = styled('small')({
  [breakpointMin('tablet')]: {
    display: 'none',
  },
});

const Title = styled('h1')(bold, fat);

// const Subtitle = styled('h2')();

const Wrapper = styled('section')({
  position: 'relative',
  paddingBottom: rhythm(0.5),
});

export const SmallMarginBottom = styled('h1')({
  marginBottom: rhythm(0.25),
  wordWrap: 'normal',
});
const H3 = SmallMarginBottom.withComponent(Header3);

const speakerCard = (speaker: Speaker, index?: number) => (
  <Card
    key={index}
    image={fill(speaker.photo.url, 300, 300, { gravity: 'faces' })}
    imagePreview={fill(speaker.photo.url, 32, 32, { gravity: 'faces' })}
    width={rhythm(8)}
    footer={(
      <React.Fragment>
        {speaker.occupation}<br />
        {index ? '' : <LearnMore>Tap on the image to learn more...</LearnMore>}
      </React.Fragment>
    )}
  >
    <Center>
      <H3 bodyFont semiBold>{speaker.name}</H3>
      <Header4 bodyFont normal>{speaker.organisation}</Header4>
    </Center>
  </Card>
);

// interface FlatProps {
//   speakers: Speaker[];
//   isInSubcategory?: boolean;
// }

// export const SpeakersFlat: React.FunctionComponent<FlatProps> = ({ speakers, isInSubcategory }) => (
//   <Wrapper id="speakers">
//     <Container>
//       {!isInSubcategory ? <Title>Speakers</Title> : <Subtitle>Speakers</Subtitle>}
//       <CardList>
//         {speakers &&
//           speakers.map((speaker, index) =>
//             speaker.description ?
//               <Modal
//                 key={index}
//                 trigger={speakerCard(speaker)}
//                 label={`Learn more about ${speaker.name}`}
//               >
//                 <ModalCard>
//                   <SmallMarginBottom>{speaker.name}</SmallMarginBottom>
//                   <p>
//                     <strong>
//                       {speaker.occupation}{speaker.organisation && `, ${speaker.organisation}`}
//                     </strong>
//                   </p>
//                   <Markdown>{speaker.description}</Markdown>
//                 </ModalCard>
//               </Modal>
//             : speakerCard(speaker, index)
//           )
//         }
//       </CardList>
//     </Container>
//   </Wrapper>
// );

interface Props {
  speakers: Speaker[];
  speakerCategories: SpeakerCategory[];
  year?: number;
}

const Speakers: React.FunctionComponent<Props> = ({ speakers, speakerCategories, year }) => (
  <Wrapper>
    <a id="speakers" />
    <Container>
      <Center>
        <Title>{!year ? 'Speakers' : `Speakers of ${year}`}</Title>
      </Center>
      {speakerCategories
        && speakerCategories.map((category, categoryIndex) => (
          <React.Fragment key={categoryIndex}>
            <Center><h2>{category.name}</h2></Center>
            <CardList>
              {speakers &&
                speakers
                  .filter(speaker => speaker.category && speaker.category === category._id)
                  .map((speaker, index) => speaker.description ? (
                    <Modal
                      key={index}
                      trigger={speakerCard(speaker)}
                      label={`Learn more about ${speaker.name}`}
                    >
                      <ModalCard>
                        <SmallMarginBottom>{speaker.name}</SmallMarginBottom>
                        <p>
                          <strong>
                            {speaker.occupation}
                            {speaker.organisation && `, ${speaker.organisation}`}
                          </strong>
                        </p>
                        <Markdown>{speaker.description}</Markdown>
                      </ModalCard>
                    </Modal>
                  ) : speakerCard(speaker, index))
              }
            </CardList>
          </React.Fragment>
        ))}
    </Container>
  </Wrapper>
);

export default Speakers;

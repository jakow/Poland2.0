import styled from '@emotion/styled';
import React from 'react';
import Markdown from 'react-markdown';
import { limit } from '../../helpers/cloudinary';
import Sponsor from '../../types/Sponsor';
import SponsorCategory from '../../types/SponsorCategory';
import Container from '../atoms/Container';
import Card, { CardList } from '../molecules/Card';
import Modal from '../molecules/Modal';
import ModalCard from '../molecules/ModalCard';
import {
  bold, Center, fat, rhythm,
} from '../typography';

const Wrapper = styled('section')({
  position: 'relative',
  margin: 0,
  paddingBottom: rhythm(1),
  'li > a:first-of-type': {
    minHeight: rhythm(6),
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      width: rhythm(12),
      padding: rhythm(1),
    },
  },
  img: {
    width: '100%',
    height: 'auto',
  },
  'p:last-of-type': {
    marginBottom: 0,
  },
});

const Title = styled('h1')(bold, fat);

interface Props {
  sponsorCategories?: SponsorCategory[];
  sponsors: Sponsor[];
  title: string;
  id?: string;
  year?: number;
}

const sponsorCard = (sponsor: Sponsor, index: number, inModal?: boolean) => (
  inModal ? (
    <Card
      key={index}
      image={limit(sponsor.logo.url, 300)}
      imagePreview={limit(sponsor.logo.url, 32)}
      footer={sponsor.name}
      width={rhythm(8)}
    />
  ) : (
    <Card
      key={index}
      image={limit(sponsor.logo.url, 300)}
      imagePreview={limit(sponsor.logo.url, 32)}
      href={sponsor.url}
      footer={sponsor.name}
      width={rhythm(8)}
    />
  )
);

const SmallMarginBottom = styled('h1')({
  marginBottom: rhythm(0.25),
  wordWrap: 'normal',
});

const mapSponsors = (category: SponsorCategory, index: number, sponsors: Sponsor[]) => (
  sponsors && (
    <React.Fragment key={index}>
      {category && (
        <Center>
          <h2>{category.name}</h2>
        </Center>
      )}
      <CardList>
        {sponsors
          .filter(sponsor => !category || sponsor.category === category._id)
          .map((sponsor, sponsorIndex) => (sponsor.description
            ? (
              <Modal
                key={sponsorIndex}
                trigger={sponsorCard(sponsor, sponsorIndex, true)}
                label={`Learn more about ${sponsor.name}`}
              >
                <ModalCard>
                  <SmallMarginBottom>{sponsor.name}</SmallMarginBottom>
                  <p>
                    <small>
                      <a
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {sponsor.url}
                      </a>
                    </small>
                  </p>
                  <Markdown>{sponsor.description}</Markdown>
                </ModalCard>
              </Modal>
            ) : sponsorCard(sponsor, sponsorIndex)))
        }
      </CardList>
    </React.Fragment>
  )
);

const Sponsors: React.FunctionComponent<Props> = ({
  sponsors, sponsorCategories, title, id, year,
}) => (
  <Wrapper>
    <a id={id} />
    <Container>
      <Center>
        <Title>{!year ? title : `${title} of ${year}`}</Title>
      </Center>
      {sponsorCategories
        ? sponsorCategories.map((category, index) => mapSponsors(category, index, sponsors))
        : mapSponsors(null, null, sponsors)
      }
      <br /><br />
      <Center>
        Would your organisation like to join this list? <a href="mailto:contact@poland20.com">Contact us!</a>
      </Center>
    </Container>
  </Wrapper>
);

export default Sponsors;

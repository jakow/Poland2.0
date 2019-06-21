import React from 'react';
import styled from '@emotion/styled';
import Markdown from 'react-markdown';
import ModalCard from './ModalCard';
import { SmallMarginBottom } from './Speakers';
import { rhythm, bold, _bold, fat, stripe, Center } from './typography';
import Card, { CardList } from './Card';
import { limit } from '../helpers/cloudinary';
import Container from './Container';
import Modal from './Modal';
import SponsorCategory from '../types/SponsorCategory';
import Sponsor from '../types/Sponsor';

const Wrapper = styled('section')({
  margin: 0,
  paddingBottom: rhythm(1),
  'li > a:first-of-type': {
    minHeight: rhythm(6),
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      width: rhythm(12),
      padding: rhythm(1)
    }
  },
  img: {
    width: '100%',
    height: 'auto'
  },
  'p:last-of-type': {
    marginBottom: 0
  }
});

const Title = styled('h1')(bold, fat, stripe);

interface Props {
  sponsorCategories: SponsorCategory[];
  sponsors: Sponsor[];
  title: string;
  id: string;
  year?: number;
}

const sponsorCard = (sponsor: Sponsor, index: number, inModal?: boolean) => (
  inModal ? (
    <Card
      key={index}
      image={limit(sponsor.logo.url, 300)}
      imagePreview={limit(sponsor.logo.url, 32)}
      footer={sponsor.name}
    />
  ) : (
    <Card
      key={index}
      image={limit(sponsor.logo.url, 300)}
      imagePreview={limit(sponsor.logo.url, 32)}
      href={sponsor.url}
      footer={sponsor.name}
    />
  )
);

const Sponsors: React.StatelessComponent<Props> = ({
  sponsors, sponsorCategories, title, id, year
}) => (
  <Wrapper id={id}>
    <Container>
      <Center>
        <Title>{!year ? title : `${title} of ${year}`}</Title>
      </Center>
      {sponsorCategories.sort((a, b) => b.priority - a.priority).map((category, index) =>
        sponsors && category.name ?
          <React.Fragment key={index}>
            <Center>
              <h2>{category.name}</h2>
            </Center>
            <CardList>
              {sponsors
                .filter(sponsor => sponsor.category === category._id)
                .map((sponsor, index) =>
                sponsor.description ?
                  <Modal
                    key={index}
                    trigger={sponsorCard(sponsor, index, true)}
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
                : sponsorCard(sponsor, index)
              )}
            </CardList>
          </React.Fragment>
          : null
        )
      }
      <br/><br/>
      <Center>
        <h4 className={_bold}>
          Would your organisation like to join this list?&nbsp;
          <a href="mailto:contact@poland20.com">Contact us!</a>
        </h4>
      </Center>
    </Container>
  </Wrapper>
);

export default Sponsors;

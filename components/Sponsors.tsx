import React from 'react';
import styled from '@emotion/styled';
import Markdown from 'react-markdown';
import ModalCard from './ModalCard';
import { SmallMarginBottom } from './Speakers';
import { SponsorCategories, Sponsor } from './types';
import { rhythm, bold, _bold, fat, stripe, Center } from './typography';
import Card, { CardList } from './Card';
import { limit } from 'helpers/cloudinary';
import Container from './Container';
import Modal from './Modal';

const Wrapper = styled('section')({
  margin: 0,
  paddingBottom: rhythm(1),
  'li > *:first-of-type': {
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
  sponsorCategories: SponsorCategories;
  title: string;
  id: string;
}

const sponsorCard = (sponsor: Sponsor, index: number, inModal?: boolean) => (
  inModal ? (
    <Card
      key={index}
      image={limit(sponsor.logo.secure_url, 300)}
      imagePreview={limit(sponsor.logo.secure_url, 32)}
      footer={sponsor.name}
    />
  ) : (
    <Card
      key={index}
      image={limit(sponsor.logo.secure_url, 300)}
      imagePreview={limit(sponsor.logo.secure_url, 32)}
      href={sponsor.url}
      footer={sponsor.name}
    />
  )
);

const Sponsors: React.StatelessComponent<Props> = ({ sponsorCategories, title, id }) => (
  <Wrapper id={id}>
    <Container>
      <Center>
        <Title>{title}</Title>
      </Center>
      {sponsorCategories.map((category, index) =>
        category.sponsors.length > 0 && category.showName ?
          <React.Fragment key={index}>
            <Center>
              <h2>{category.sponsors.length > 1 ? category.name : category.singular}</h2>
            </Center>
            <CardList>
              {category.sponsors.map((sponsor, index) =>
                sponsor.description.md && sponsor.description.md.length > 0 ?
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
                      <Markdown>{sponsor.description.md}</Markdown>
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

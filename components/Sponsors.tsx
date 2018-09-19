import React from 'react';
import styled from 'react-emotion';
import Markdown from 'react-markdown';
import {
  rhythm,
  Center,
  bold,
  stripe,
  fat,
  limit,
  Container,
  Card,
  CardList,
  Modal
} from 'p20-components';
import { SponsorCategories, Sponsor } from '../pages';
import ModalCard from './ModalCard';
import { smallMarginBottom } from './Speakers';

const Wrapper = styled('section')({
  margin: 0,
  paddingBottom: rhythm(1),
  'li > a': {
    minHeight: rhythm(6),
    display: 'flex',
    justifyContent: 'center'
  },
  img: {
    maxWidth: rhythm(12),
    maxHeight: rhythm(6),
    padding: rhythm(1)
  },
  'p:last-child': {
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
        category.showName ?
          <React.Fragment key={index}>
            <Center>
              <h2>{category.sponsors.length > 0 ? category.name : category.singular}</h2>
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
                      <h1 className={smallMarginBottom}>{sponsor.name}</h1>
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
        <h4 className={bold}>
          Would your organisation like to join this list?&nbsp;
          <a href="mailto:contact@poland20.com">Contact us!</a>
        </h4>
      </Center>
    </Container>
  </Wrapper>
);

export default Sponsors;

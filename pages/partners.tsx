import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import Container from '../components/atoms/Container';
import { Header1, Header2 } from '../components/atoms/Headers';
import { withBackground } from '../components/hoc';
import Card, { CardList } from '../components/molecules/Card';
import { Center, rhythm } from '../components/typography';
import { colors } from '../components/variables';
import { limit } from '../helpers/cloudinary';
import { DefaultPageProps } from './_app';

export const PartnersWrapper = styled('section')({
  [`${Header1}, ${Header2}, ${Center}`]: {
    color: `${colors.white}`,
    a: {
      color: `${colors.white}`,
      fontWeight: 600,
    },
  },
  margin: 0,
  paddingBottom: rhythm(1),
  li: {
    'a:first-of-type': {
      display: 'flex',
      justifyContent: 'center',
      '& > *': {
        height: rhythm(7),
        padding: rhythm(1),
      },
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: rhythm(4),
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

const Partners: FunctionComponent<DefaultPageProps> = ({ currentEdition }) => (
  <PartnersWrapper>
    <Container>
      <Header1 fat>
        {!currentEdition.previousSponsorsYear ? 'Partners' : `Partners of ${currentEdition.previousSponsorsYear}`}
      </Header1>
      {currentEdition.sponsors && currentEdition.sponsorCategories
        && currentEdition.sponsorCategories.map((category, index) => (
          <React.Fragment key={index}>
            <Header2>{category.name}</Header2>
            <CardList style={{ justifyContent: 'flex-start' }}>
              {currentEdition.sponsors
                .filter(sponsor => !category || sponsor.category === category._id)
                .map((sponsor, sponsorIndex) => (
                  <Card
                    key={sponsorIndex}
                    image={limit(sponsor.logo.url, 300)}
                    imagePreview={limit(sponsor.logo.url, 32)}
                    href={sponsor.url}
                    footer={sponsor.name}
                    width={rhythm(8)}
                  />
                ))
              }
            </CardList>
          </React.Fragment>
        ))
      }
      <br />
      <Center>
        Would your organisation like to join this list? <a href="mailto:contact@poland20.com">Contact us!</a>
      </Center>
    </Container>
  </PartnersWrapper>
);

export default withBackground(Partners, colors.red);

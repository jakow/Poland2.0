import React from 'react';
import styled from 'react-emotion';
import {
  Container,
  rhythm,
  Center,
  bold,
  fat,
  stripe,
  CardList,
  Card
} from 'p20-components';
import { SpeakerCategories } from '../pages';

const Title = styled('h1')(bold, fat, stripe);

const Wrapper = styled('section')({
  position: 'relative',
  paddingBottom: rhythm(0.5),
  backgroundSize: '100% auto',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'bottom', // tslint:disable-next-line
  backgroundImage: 'url(https://res.cloudinary.com/dg1royeho/image/upload/v1500036070/DSC_0361n_desaturated_mhcrqh.jpg)'
});

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
                  category.speakers.map((speaker, index) => (
                    <Card key={index}/>
                  )
                )}
              </CardList>
            </React.Fragment>
          ))}
      </Container>
    </Wrapper>
  );

export default Speakers;

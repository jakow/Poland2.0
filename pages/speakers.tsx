import { FunctionComponent } from 'react';
import Background from '../components/atoms/Background';
import Speakers from '../components/organisms/Speakers';
import { DefaultPageProps } from './_app';

const SpeakersPage: FunctionComponent<DefaultPageProps> = ({ currentEdition }) => (
  <Background>
    <Speakers
      speakerCategories={currentEdition.speakerCategories}
      speakers={currentEdition.speakers}
      year={currentEdition.previousSpeakersYear}
    />
  </Background>
);

export default SpeakersPage;

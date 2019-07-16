import Background from '../components/atoms/Background';
import Speakers from '../components/organisms/Speakers';
import { FunctionComponent } from 'react';
import { DefaultPageProps } from './_app';

const SpeakersPage: FunctionComponent<DefaultPageProps> = ({ currentEdition }) => (
  <Background>
    <Speakers
      speakerCategories={currentEdition.speakerCategories}
      speakers={currentEdition.speakers}
      year={currentEdition.previousAgendaYear && currentEdition.previousAgendaYear}
    />
  </Background>
);

export default SpeakersPage;

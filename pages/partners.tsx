import Background from '../components/atoms/Background';
import Sponsors from '../components/organisms/Sponsors';
import { FunctionComponent } from 'react';
import { DefaultPageProps } from './_app';

const Partners: FunctionComponent<DefaultPageProps> = ({ currentEdition }) => (
  <Background>
    <Sponsors
      id="partners"
      sponsorCategories={currentEdition.sponsorCategories}
      sponsors={currentEdition.sponsors}
      title="Partners"
      year={currentEdition.previousSponsorsYear && currentEdition.previousSponsorsYear}
    />
  </Background>
);

export default Partners;

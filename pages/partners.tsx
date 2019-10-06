import { FunctionComponent } from 'react';
import Background from '../components/atoms/Background';
import { withBackground } from '../components/hoc';
import Sponsors from '../components/organisms/Sponsors';
import { DefaultPageProps } from './_app';

const Partners: FunctionComponent<DefaultPageProps> = ({ currentEdition }) => (
  <Background>
    <Sponsors
      id="partners"
      sponsorCategories={currentEdition.sponsorCategories}
      sponsors={currentEdition.sponsors}
      title="Partners"
      year={currentEdition.previousSponsorsYear}
    />
  </Background>
);

export default withBackground(Partners);

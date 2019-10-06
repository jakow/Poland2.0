import React from 'react';
import { storiesOf } from '@storybook/react';
import PersonCard from '../components/molecules/PersonCard';
import { colors } from '../components/variables';
import Speaker from '../types/Speaker';
import TeamMember from '../types/TeamMember';

const teamMember: TeamMember = {
  name: 'Dawid Fleischer',
  position: 'Project Leader',
  organisation: 'University of Warwick',
  email: 'dawid.fleischer@poland20.com',
  linkedin: 'https://www.linkedin.com/in/izabelabany/',
  instagram: 'https://instagram.com',
  photo: {
    url: 'https://res.cloudinary.com/dg1royeho/image/upload/v1561476576/oecv73txxkdpjlu1ui4g.jpg',
  },
};
const speaker: Speaker = {
  name: 'Małgorzata O\'Shaughnessy',
  occupation: 'Strategic Advisor, CEE',
  organisation: 'Visa', /* eslint-disable */
  description: `A graduate of the Foreign Trade Department at Warsaw School of Economics, she continued her studies in London.

Winner of many awards for her contribution to cashless growth and a high-place entrant in major businesswomen rankings in Poland, Małgorzata was in 2015 named one of the Top Ten most influential women in the Polish financial sector, in a prestigious survey of the Institute for Innovative Economy, held under the patronage of the Polish Bank Association. In May 2019 she was awarded the title of Digital Economy Personality of 2018 by the Digital Economy Congress in Warsaw.

At the turn of 2015 and 2016, Małgorzata worked on a secondment in Visa Europe London HQ in the capacity of regional president responsible for HQ communication with all Visa Europe Regional Managing Directors.

In the course of her long standing service for Visa, she was responsible for system development in Central and Eastern European countries, including Poland, which on her watch turned into one of Visa’s most innovative European markets, with its successes in contactless payments and initiatives such as Cashless Poland.

She was the co-creator of the Warsaw Innovation Incubator, a joint initiative of Visa and its client banks, seeking to develop solutions – together with other partners – that will drive payments growth and digitalisation of the Polish economy.

She stepped down from the position of Regional Managing Director, CEE, Visa in July this year.`,
  photo: { /* eslint-enable */
    url: 'https://res.cloudinary.com/dg1royeho/image/upload/gnnrg4lffm3lpd34snie.jpg',
  },
};

storiesOf('PersonCard', module)
  .add('teamMember', () => <PersonCard person={teamMember} />)
  .add('speaker', () => <PersonCard person={speaker} />)
  .add('list', () => (
    <ul style={{ margin: 0 }}>
      <PersonCard person={speaker} color={colors.purple} />
      <PersonCard person={teamMember} />
    </ul>
  ));

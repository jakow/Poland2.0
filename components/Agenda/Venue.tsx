import * as React from 'react';
import styled from '@emotion/styled';
import { breakpointMin, colors } from 'components/variables';
import { rhythm, bold } from 'components/typography';
import { Venue } from 'types/Venue';
import { MapIcon } from 'components/icons';
import { mapsUrl } from 'helpers/maps';

const Wrapper = styled('section')({
  [breakpointMin('mobile')]: {
    flex: '0 1 33%'
  },
  marginBottom: rhythm(1),
  p: {
    margin: 0
  }
});

const MapLink = styled('a')({
  color: `${colors.primary}`,
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
});

const Header = styled('header')(
  {
    color: `${colors.darkGray}`
  },
  bold
);

const _Venue: React.StatelessComponent<{ venue: Venue }> = ({ venue }) => (
  <Wrapper>
    <Header>Venue</Header>
    {!venue.location
    ?
      <p>{venue.name}</p>
    :
      <React.Fragment>
        <p>{venue.name}</p>
        {venue.location.street1 && <p>{venue.location.street1}</p>}
        {venue.location.street2 && <p>{venue.location.street2}</p>}
        {venue.location.suburb &&
          <p>
            {venue.location.suburb}, {venue.location.postcode && venue.location.postcode}
          </p>
        }
        <MapLink
          href={mapsUrl(venue.name, venue.location)}
          rel="noopener noreferrer"
          target="_blank"
        >
          <i><MapIcon/>&ensp;</i>
          <span>View on the map</span>
        </MapLink>
      </React.Fragment>
    }
  </Wrapper>
);

export default _Venue;

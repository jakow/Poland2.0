import * as React from 'react';
import styled from '@emotion/styled';
import { breakpointMin, colors } from '../../variables';
import { rhythm, bold } from '../../typography';
import { mapsUrl } from '../../../helpers/maps';
import Venue from '../../../types/Venue';
import { Icon } from '@blueprintjs/core';

const Wrapper = styled('section')({
  [breakpointMin('mobile')]: {
    flex: '0 1 33%'
  },
  marginBottom: rhythm(1),
  p: {
    margin: 0,
    whiteSpace: 'pre-line'
  }
});

const MapLink = styled('a')({
  color: `${colors.red}`,
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
        <p>{venue.location}</p>
        <MapLink
          href={mapsUrl(venue.name, venue.location)}
          rel="noopener noreferrer"
          target="_blank"
        >
          <i><Icon icon="map" iconSize={12} color={`${colors.red}`}/>&ensp;</i>
          <span>View on the map</span>
        </MapLink>
      </React.Fragment>
    }
  </Wrapper>
);

export default _Venue;

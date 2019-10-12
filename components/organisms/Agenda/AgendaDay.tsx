import React from 'react';
import { Icon } from '@blueprintjs/core';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import { mapsUrl } from '../../../helpers/maps';
import { AgendaDayType } from '../../../types/Agenda';
import { Header2, Header3 } from '../../atoms/Headers';
import { IconLabel, TextWithIcon } from '../../molecules/TicketTile';
import { dangerousSuperscripts, rhythm } from '../../typography';
import { colors } from '../../variables';
import AgendaEvent from './AgendaEvent';

const MapLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  paddingLeft: rhythm(0.5),
  textDecoration: 'none',
});

const Wrapper = styled('section')({
  marginBottom: rhythm(2),
  '.bp3-icon': {
    display: 'flex',
    alignItems: 'center',
  },
  [`& > ${Header3}, & > p`]: {
    marginBottom: rhythm(0.5),
  },
  '& > p': {
    textAlign: 'justify',
  },
  [TextWithIcon as any]: {
    marginBottom: rhythm(1),
  },
});

const AgendaDay: React.FunctionComponent<AgendaDayType> = ({
  name, description, date, events, venue,
}) => {
  if (events) {
    const eventCategories = new Set();
    events.forEach((event) => {
      if (!event.category) {
        return;
      }

      if (eventCategories.has(event.category.name)) {
        event.category.name = null;
      } else {
        eventCategories.add(event.category.name);
      }
    });
  }

  return (
    <Wrapper>
      <Header3 uppercase dangerouslySetInnerHTML={dangerousSuperscripts(name)} />
      <ReactMarkdown>{description}</ReactMarkdown>
      <TextWithIcon>
        <Icon icon="map-marker" color={`${colors.white}`} iconSize={24} />
        <IconLabel>
          {venue.name}
          <br />
          {venue.location}
        </IconLabel>
        <MapLink href={mapsUrl(venue.name, venue.location)} rel="noopener noreferrer" target="_blank">
          <Icon icon="map" color={`${colors.white}`} iconSize={24} />
        </MapLink>
      </TextWithIcon>
      {events && events.map((event, index) => <AgendaEvent {...event} key={index} />)}
    </Wrapper>
  );
};

export default AgendaDay;

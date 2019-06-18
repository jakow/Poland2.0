// import { VenueLocation } from 'types/Venue';

// function locationString(name: string, location: VenueLocation) {
//   const { street1, street2, suburb, postcode } = location;
//   const arr = [name, street1, street2, suburb, postcode];
//   return arr.filter(notEmpty).join(', ');
// }

function locationString(name: string, location: string) {
  return [name, location].join(', ').replace('\n', '');
}

export const mapsUrl = (name: string, location: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURI(locationString(name, location))}`;

function notEmpty(s?: string) {
  return s != null && s.length > 0;
}

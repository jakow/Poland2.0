// given a string with ordinal numbers with 'th', 'rd' etc, add a superscript
import {Schema} from 'keystone';
import {googleMapsBrowserKey} from '../../config';

function locationString(location: Schema.Location) {
    const {name, number: num, street1, street2, suburb, postcode} = location;
    const arr = [name, num, street1, street2, suburb, postcode];
    return arr.filter(notEmpty).join(', ');
}
export function googleMapsUrl(location: Schema.Location) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURI(locationString(location))}`;
}

export function googleMapsEmbedUrl(location: Schema.Location) {
  const query = encodeURI(locationString(location));
  return `https://www.google.com/maps/embed/v1/place?key=${googleMapsBrowserKey}&q=${query}`;
}

export function ordinalSuperscripts(text: string): string {
  const ordinalRegexp = /\d+(st|th|rd|nd)/g;
  return text.replace(ordinalRegexp, (substr, offset, str) => {
    const subscript = substr.replace(/\d+/, '');
    return substr.replace(subscript, `<sup>${subscript}</sup>`);
  });
}

function notEmpty(s?: string) {
  return s != null && s.length > 0;
}

export function slugify(str: string) {
  return str.replace(/\s+/g, '-').toLowerCase();
}

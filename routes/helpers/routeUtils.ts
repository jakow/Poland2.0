// given a string with ordinal numbers with 'th', 'rd' etc, add a superscript
import {Schema} from 'keystone';
export function googleMapUrl(location: Schema.Location) {
    const {name, number: num, street1, street2, suburb, postcode} = location;
    const arr = [name, num, street1, street2, suburb, postcode];
    const locationString = arr.filter(notEmpty).join(', ');
    return `https://www.google.com/maps/search/?api=1&query=${encodeURI(locationString)}`;
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

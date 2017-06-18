import {Schema} from 'keystone';
import {Edition} from '../../models/Edition';
import {Speaker} from '../../models/Speaker';
import {SpeakerCategory} from '../../models/SpeakerCategory';
import {Sponsor} from '../../models/Sponsor';
import {ContentControl} from '../../models/ContentControl';
import {flatMap} from 'lodash';
const stripTags: any = require('striptags');

/**
 * Create a JSON-LD representation of the event promoted by the page.
 */
export function event(edition: Edition, speakers: Speaker[], sponsors: Sponsor[], contentControl: ContentControl) {
  const {facebookUrl, twitterUrl, linkedinUrl, language, ticketsLive} = contentControl;
  const sameAs: string[] = [linkedinUrl, facebookUrl, twitterUrl].filter((url) => url != null);
  const languages = language && language.replace(/\s/g, '').split(',') || [];
  const {start, end} = edition.date;
  return {
    '@context': 'http://schema.org',
    '@type': 'Event',
    'name': edition.name,
    'url': 'https://poland20.com',
    'image': 'https://poland20.com/images/logo.svg',
    'description': stripTags(edition.description),
    'location': place(edition.venue),
    ...start && {startDate: start.toISOString()},
    ...end && {endDate: end.toISOString()},
    ...sameAs.length && {sameAs},
    ...sponsors && sponsors.length && {sponsor: sponsors.map(sponsorOrganization)},
    ...languages.length && {inLanguage: languages},
    ...ticketsLive && {offers: offers(contentControl)},
    ...speakers && speakers.length && {performer: speakers.map(performer)},
  };
}

function sponsorOrganization(sponsor: Sponsor) {
  return {
    '@type': 'Organization',
    'name': sponsor.name,
    'sameAs': [
      sponsor.url,
    ],
    'logo': sponsor.logo.secure_url,
  };
}

function place(p: {name: string, location: Schema.Location}) {
  if (!p) {
    return undefined;
  }
  return {
    '@type': 'Place',
    'name': p.name,
    'address': postalAddress(p.location),
  };
}

function postalAddress(location: Schema.Location) {
  if (!location) {
    return undefined;
  }
  return {
    '@type': 'PostalAddress',
    ...location.country && {addressCountry: location.country},
    ...location.suburb && {addressLocality: location.suburb},
    ...location.state && {addressRegion: location.state},
    ...location.postcode && {postalCode: location.postcode},
    ...location.street1 && {streetAddress: location.street1 + ' ' + location.street2},
  };
}

function offers(contentControl: ContentControl) {
  const {ticketPrices, ticketCurrency, ticketUrl} = contentControl;
  const prices = ticketPrices ? ticketPrices.replace(/\s/g, '').split(',') : [];
  return prices.map( (price) => (
    {
      '@type': 'Offer',
      'price': price,
      'priceCurrency': ticketCurrency,
      'url': ticketUrl,
    }
  ));
}

function performer(speaker: Speaker) {
  return {
    '@type': 'Person',
    'name': speaker.name,
    'affiliation': {
      '@type': 'Organization',
      'name': speaker.company,
    },
    'jobTitle': speaker.position,
    'image': speaker.photo.secure_url,
  };
}


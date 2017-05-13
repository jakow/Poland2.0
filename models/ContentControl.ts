import * as keystone from 'keystone';
const Types = keystone.Field.Types;

export interface ContentControl {
  title: string;
  speakerRegistrationActive: boolean;
  speakerMenuButton: boolean;
  showSponsors: boolean;
  ticketsLive: boolean;
  ticketUrl: string;
  ticketMessage: string;

  countdown: boolean;
  countdownDate: string;
  ticketRegistrationSignup: boolean;
  agendaActive: boolean;
  showVenues: boolean;
  language: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  gaTrackingID: string;
  bylawLink: string;
  // SEO
  ticketPrices: string;
  ticketCurrency: string;
}

const ContentControl = new keystone.List<ContentControl>('ContentControl', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title' },
  nocreate: true,
  nodelete: true,
});

ContentControl.add(
{title: {type: String, noedit: true}},
'Content',
{
	// ,
	// testimonials: {type: String, label: 'Testimonials -  a list of quotes in DOUBLE QUOTES delimited
  // by SEMICOLON in the form of: "quote text", author; "quote text", author;'}
},
'Speakers & Registration',
{
  speakerRegistrationActive: Boolean,
  speakerMenuButton: Boolean,
},
'Sponsors',
{
  showSponsors: Boolean,
},
'Tickets',
{
  ticketsLive: Boolean,
  ticketUrl: Types.Url,
  ticketMessage: String,
  ticketPrices: {type: String, label: 'Ticket prices (comma separated)' },
  ticketCurrency: String,
  countdown: Boolean,
  countdownDate: {type: String, dependsOn: {countdown: true}},
  ticketRegistrationSignup: {type: Boolean, label: 'Ticket newsletter signup active'},
},
'Agenda & Venues',
{
  agendaActive: Boolean,
  showVenues: Boolean,
},
'SEO & Technical',
{
  language: {type: String, label: 'Languages (comma-separated in IETF BCP 47 format)'},
  facebookUrl: {type: Types.Url, label: 'Facebook URL'},
  twitterUrl: {type: Types.Url, label: 'Twitter URL'},
  linkedinUrl: {type: Types.Url, label: 'LinkedIn URL'},
  gaTrackingID: {type: String, label: 'Google Analytics Tracking ID'},
},
'Legal',
{
  bylawLink: {type: Types.Url, label: 'Link to "Bylaw for Poland 2.0 Document"'},
},
);

ContentControl.register();

export default ContentControl;

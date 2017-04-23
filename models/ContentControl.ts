import * as keystone from 'keystone';
const Types = keystone.Field.Types;
const ContentControl = new keystone.List('ContentControl', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title' },
  nocreate: true,
  nodelete: true,
});

ContentControl.add(
{title: {type: String, noedit: true}},
'Content',
{
  backgroundVideo: {
    enable: {type: Boolean},
    id: {
      dependsOn: {'backgroundVideo.enable': true},
      type: String,
      label: 'Youtube video ID (11 character alphanumeric string, e.g. dQw4w9WgXcQ)',
    },
  },
  homepageText: {type: Types.Html, label: 'Homepage intro section', wysiwyg: true},
  aboutPoland20: {
    bannerText: {type: Types.Html, wysiwyg: true, label: '"About Poland 2.0" section - Banner text'},
    bodyText: {type: Types.Html, wysiwyg: true, label: '"About Poland 2.0" section - Body text'},
  },
	// ,
	// testimonials: {type: String, label: 'Testimonials -  a list of quotes in DOUBLE QUOTES delimited
  // by SEMICOLON in the form of: "quote text", author; "quote text", author;'}
},
'Speakers & Registration',
{
  speakerRegistrationActive: Boolean,
  speakerMenuButton: Boolean,
  speakerMenuTarget: Types.Url},
  'Sponsors',
  {
  showSponsors: Boolean,
  },
  'Tickets',
  {
    ticketsLive: Boolean,
    ticketsUrl: Types.Url,
    ticketMessage: {type: String},
    countdown: Boolean,
    countdownDate: {type: String, dependsOn: {countdown: true}},
    ticketRegistrationSignup: {type: Boolean, label: 'Ticket newsletter signup active'},
  },
  'Agenda & Venues',
  {
    agendaActive: Boolean,
    showVenues: Boolean,
  },
  'Technical',
  {
    gaTrackingID: {type: String, label: 'Google Analytics Tracking ID'},
  },
  'Legal',
  {
    bylawLink: {type: Types.Url, label: 'Link to "Bylaw for Poland 2.0 Document"'},
  },
);

ContentControl.register();

export default ContentControl;

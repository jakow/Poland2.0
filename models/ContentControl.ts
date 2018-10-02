import * as keystone from 'keystone';
const Types = keystone.Field.Types;

export interface ContentControl {
  title: string;
  // Content & promo
  description: string;
  testimonials: string;
  video: {
    enable: boolean;
    url: string;
  };
  // Speakers
  showSpeakers: boolean;
  // Sponsors
  showSponsors: boolean;
  showPreviousSponsors: boolean;
  // Tickets
  tickets: {
    live: boolean;
    showSection: boolean;
    url: string;
    header: string;
    message: {md: string; html: string};
    prices: string;
    button: boolean;
    buttonText: string;
    buttonClass: string;
    currency: string;
    countdown: boolean;
    countdownDate: Date;
  };

  showAgenda: boolean;
  showVenues: boolean;

  language: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  snapchatUrl: string;
  videoChannelUrl: string;
  opengraphImage: string;
  opengraphDescription: string;
  twitterImage: string;
  // gaTrackingID: string;
  bylawLink: string;
  privacyPolicy: string;
}

const ContentControl = new keystone.List<ContentControl>('ContentControl', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title' },
  nocreate: true,
  nodelete: true,
});

ContentControl.add(
  { title: { type: String, noedit: true } },
  'Content & Promo',
  {
    description: { type: Types.Html, wysiwyg: false },
    testimonials: {type: String, label:
    'Testimonials - in the form of: "quote text", author; "another quote text", another author;'},
    video: {
      enable: Boolean,
      url: { type: String, label: 'Embed url' },
    },
  },
  'Speakers & Registration',
  {
    showSpeakers: Boolean,
  },
  'Sponsors',
  {
    showSponsors: Boolean,
    showPreviousSponsors: { type: Boolean, dependsOn: { showSponsors: false } },
  },
  'Tickets',
  {
    tickets: {
      live: Boolean,
      showSection: Boolean,
      url: Types.Url,
      header: String,
      message: Types.Markdown,
      prices: { type: String, label: 'Ticket prices (comma separated)' },
      currency: String,
      countdown: Boolean,
      countdownDate: {
        type: Date,
        label: 'Countdown date (UTC)',
        utc: true,
        dependsOn: { 'tickets.countdown': true }
      },
      button: { type: Boolean, label: 'Show tickets button' },
      buttonText: { type: String, dependsOn: { 'tickets.button': true } },
      buttonClass: { type: String, dependsOn: { 'tickets.button': true } },
    },
  },
  'Agenda & Venues',
  {
    showAgenda: Boolean,
    showVenues: Boolean,
  },
  'SEO & Technical',
  {
    language: { type: String, label: 'Languages (comma-separated in IETF BCP 47 format)' },
    facebookUrl: { type: Types.Url, label: 'Facebook URL' },
    twitterUrl: { type: Types.Url, label: 'Twitter URL' },
    linkedinUrl: { type: Types.Url, label: 'LinkedIn URL' },
    snapchatUrl: { type: Types.Url, label: 'Snapchat URL' },
    videoChannelUrl: { type: Types.Url, label: 'Video channel URL (YouTube/Vimeo)' },

    opengraphImage: String,
    opengraphDescription: String,
    twitterImage: String,
    // gaTrackingID: { type: String, label: 'Google Analytics Tracking ID' },
  },
  'Legal',
  {
    bylawLink: { type: Types.Url, label: 'Link to the By-law Document' },
    privacyPolicy: { type: Types.Markdown, label: 'Privacy Policy' }
  }
);

ContentControl.register();

export default ContentControl;

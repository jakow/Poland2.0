var keystone = require('keystone');
var Types = keystone.Field.Types;
var ContentControl = new keystone.List('ContentControl', {
		map: { name: 'title' },
		autokey: { path: 'slug', from: 'title' },
		nocreate: true,
		nodelete: true
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
				label: "Youtube video ID (11 character alphanumeric string, e.g. dQw4w9WgXcQ)"
			}
		},
		homepageText: {type: Types.Html, label: 'Homepage intro section', wysiwyg: true},
		aboutPoland20: {
			bannerText: {type: Types.Html, wysiwyg: true, label: "'About Poland 2.0' section - Banner text"},
			bodyText: {type: Types.Html, wysiwyg: true, label: "'About Poland 2.0' section - Body text"}
		},
		testimonials: {type: String, label: 'Testimonials -  a list of quotes in DOUBLE QUOTES delimited by SEMICOLON in the form of: "quote text", author; "quote text", author;'}
		
	},
	'Speaker Registration',
	{speakerRegistrationActive: Boolean},
	'Tickets',
	{
	ticketsLive: Boolean,
	ticketsUrl: Types.Url,
	ticketRegistrationSignup: {type: Boolean, label: 'Ticket newsletter signup active'}
	},
	'Agenda',
	{
		agendaActive: Boolean,
		agenda: {
			type: Types.Markdown, 
			label: 'Agenda text - use Markdown', 
			default: '[instructions - do not remove]: <> (Use markdown tables in the form of: | time | brief description | detailed description | speaker |. The description of markdown tables can be found here: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#tables)'
		}
	},
	'Legal',
	{
		privacyPolicy: {type: Types.Html, wysiwyg: true},
		termsAndConditions: {type: Types.Html, wysiwyg: true},
		bylawLink: {type: Types.Url, label: 'Link to "Bylaw for Poland 2.0 Document"'}
	},
	'Technical',
	{
		gaTrackingID: {type: String, label: 'Google Analytics Tracking ID'}
	}	
	);

ContentControl.schema.virtual('parsedTestimonials').get(function() {
	//quotes must be array of strings...
	console.log(this.testimonials);
	if (!this.testimonials) return [];
	var quotes = this.testimonials.split(';');
	console.log('quotes: ', quotes);
	if (quotes)
		return quotes.filter(quote => ('' !== quote)).map((quote) => {
			var spl = quote.split(',');
			var q = quote.match(/"([^"\\]*(?:\\.[^"\\]*)*)"/) //extract text between quotes
			console.log(q);
			//quote could be wrapped in quotes, so split them
			return {quote: q[0], 
				author: spl[spl.length-1]}
		});
	else
		return [];
})
ContentControl.register();


//create a single instance of controls TODO: maybe move to updates?

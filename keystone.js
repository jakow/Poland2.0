
// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
if (process.env.NODE_ENV == 'development')
	require('dotenv').load();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'Poland 2.0',
	'brand': 'Poland 2.0',
	'static': ['public', 'bower_components'],
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',
	
	'emails': 'templates/emails',
	
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User'

});
var keystone = require('keystone');


// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));


// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#112233',
		buttons: {
			color: '#fff',
			background_color: '#112233',
			border_color: '##112233'
		}
	}
});

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

keystone.set('email rules', [{
	find: '/images/',
	replace: (keystone.get('env') === 'production') ? 'http://www.your-server.com/images/' : 'http://localhost:3000/images/'
}, {
	find: '/keystone/',
	replace: (keystone.get('env') === 'production') ? 'http://www.your-server.com/keystone/' : 'http://localhost:3000/keystone/'
}]);

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	//'news': ['posts', 'post-categories'],
	'speakers': 'speakers',
	'sponsors': 'sponsors',
	'editions': 'editions',
	'team-members': 'team-members',
	'users': 'users'
});

keystone.set('signin logo', '/images/logo.svg');
// keystone.set('wysiwyg images', true);
// keystone.set('wysiwyg cloudinary images', true);
// keystone.set('wysiwyg additional buttons', 'forecolor backcolor insert link');
// keystone.set('wysiwyg additional plugins', 'textcolor colorpicker link');
// keystone.set('wysiwyg menubar', true);
// keystone.set('wysiwyg additional options', {
// 	menubar: true
// });
// keystone.set('wysiwyg menubar', true);
// keystone.set('admin path', 'admin'); //doesnt work in current release of keystone


//cloudinary
keystone.set('cloudinary config', process.env.CLOUDINARY_URL );

//openshift deployment
if(process.env.OPENSHIFT_NODEJS_PORT) {
	console.log('Setting node port')
	keystone.set('port', process.env.OPENSHIFT_NODEJS_PORT);
}
if(process.env.OPENSHIFT_NODEJS_IP) {
	console.log('setting node ip');
	keystone.set('host', process.env.OPENSHIFT_NODEJS_IP);
}
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
	console.log('setting mongo url');
    keystone.set('mongo', process.env.OPENSHIFT_MONGODB_DB_URL);
}

if(process.env.OPENSHIFT_SECRET_TOKEN) {
	console.log('setting SECRET tokeng');
	keystone.set('cookie secret', process.env.OPENSHIFT_SECRET_TOKEN)
}

if(process.env.NODE_ENV === 'production')
	keystone.set('session store', 'connect-mongo')
// Start Keystone to connect to your database and initialise the web server

console.log(process.env.MONGO_URI)
// console.log('NODE_ENV='+process.env.NODE_ENV)
keystone.start();



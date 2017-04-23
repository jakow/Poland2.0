/**
 * This file contains the common middleware used by your routes.
 * 
 * Extend or replace these functions as your application requires.
 * 
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

// TODO replace async lib spaghhetti with ES7 async/await
var _ = require('underscore');
var keystone = require('keystone');
var async = require('async');

/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;
	locals.navLinks = [
		{ label: 'About PL2.0',		key: 'about',		href: '/about'},
		{ label: 'Past Editions',		key: 'past-editions',		href: '/past-editions' },
		];

	keystone.list('ContentControl').model.findOne()
	// .select({ticketsLive: 1, speakerMenuButton:1, agendaActive:1, showSponsors:1 })
	.exec(function(err, result) {
		var content = result;
		var additional = [];
		if (content) {
			//add tickets link if live
			if (content.ticketsLive)
				additional.push({label:'Tickets', key: 'tickets', href: content.ticketsUrl});
			//add speaker menu if live
			if (content.speakerMenuButton)
				additional.push({label:'Speakers', key: 'speakers', href: content.speakerMenuTarget});
			// add agenda link if active
			if (content.agendaActive)
				additional.push({label:'Agenda', key: 'agenda', href: '/#agenda'});
			//if sponsor categories are not empty, add them
			if (content.showVenues)
				additional.push({label: 'Venue', key: 'venue', href: '/#venue'});
			if (content.showSponsors)
				additional.push({label: 'Partners', key: 'partners', href: '#partners'});

			locals.navLinks = additional.concat(locals.navLinks);
		}
		locals.footerLinks = [
		{label: 'Contact', key: 'contact', href: '/contact'},
		// {label: 'Terms & Conditions', key: 'legal', href: '/legal#terms-and-conditions'},
		// {label: 'Privacy Policy', key: 'legal', href: '/legal#privacy-policy'},
		{label: 'Bylaw for Poland 2.0', key: 'bylaw', href: result.bylawLink}

		];

		locals.content = result;

		next(err);
	});
//	locals.user = req.user;
	
};


exports.initErrorHandlers = function(req, res, next) {
    
    res.err = function(err, title, message) {

        return res.status(500).render('errors/500', {
            err: err,
            errorTitle: title,
            errorMsg: message
        });
    };
    
    res.notFound = function(title, message) {

        return res.status(404).render('errors/404', {
            errorTitle: title,
            errorMsg: message
        });
    };
    
    next();
    
};


//if you need to filter by edition, use this middleware in index.js
exports.getCurrentEdition = function(req, res, next) {
		var q = keystone.list('Edition').model.findOne({current:true});
		q.exec(function(err, result){
			if(result)
				res.locals.currentEdition = result;
			next(err);
		});
};

	function scaleCloudinaryImg(photoUrl, width) {
		if (typeof(photoUrl) === 'string')
			return photoUrl.replace('upload/', `upload/c_scale,w_${width},fl_progressive/`);
		else
			return ''; //fail silently...
	}

exports.loadSponsors = function(req, res, next) {
		// define the steps to load sponsors of all sponsor categories  of current editions

		function getCurrent(callback) {
			keystone.list('Edition')
				.model.findOne({current:true}).select({id: 1})
				.exec(callback);
		}

		function getSponsorCategories(edition, callback) {
			if(edition) {
				keystone.list('SponsorCategory')
					.model.find({edition: edition.id})
					.sort({sortOrder: 1})
					.exec((err, categories) => {
						callback(err,categories,edition);
					});
			}
			else {
				callback(null, [], edition);
			}
		}

		function populateSponsorCategories(categories, edition, callback) {
			async.each(categories, 
				function(category, cb){
					keystone.list('Sponsor').model
						.find({category: category.id, edition: edition.id})
						.sort({sortOrder:1})
						.exec((err,sponsors) => {
							category.sponsors = sponsors;
							cb(err);
						});
				}, 
				function (err) {
					callback(err, categories);
				});
		}
		//execute a "waterfall" of the above functions
		async.waterfall(
			[
			getCurrent,
			getSponsorCategories,
			populateSponsorCategories, 
			],
			//after the above are finished, the function below is called
			function(err, categories) {
				if(!res.locals) res.locals = {}; // what an awful hack
				res.locals.sponsorCategories = categories.filter(category => (category.sponsors.length)); //remove empty categories
				//minify images
				res.locals.sponsorCategories.forEach(category => {
					category.sponsors.forEach(sponsor => {
						sponsor.logo.secure_url = scaleCloudinaryImg(sponsor.logo.secure_url, 600);
					});
				});
				next(err);
			});

};

exports.getStaticPages = function (req,res, next) {
	keystone.list('StaticPage').model
	.find({showInMenu: true})
	.select({name: 1, route: 1, showInMenu: 1, menuOrder: 1})
	.exec(function(err,result) {
		if (result) {
			res.locals.staticPages = result;
			//insert menu items into navLinks
			var navLinks = res.locals.navLinks;
			var menuItems = result.filter(page => (page.showInMenu)).sort((a,b) => (Math.sign(a.menuOrder - b.menuOrder)));
			for(var i = 0; i < menuItems.length; ++i) {
				navLinks.splice(menuItems[i].menuOrder, //splice starting at menu order
					0, // do not delete anything
					{ label: menuItems[i].name,		key: menuItems[i].route,		href: `/${menuItems[i].route}`});
			}
		}
		next(err);

	});
};

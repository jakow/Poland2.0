/**
 * This file contains the common middleware used by your routes.
 * 
 * Extend or replace these functions as your application requires.
 * 
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

 String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

var _ = require('underscore');
var keystone = require('keystone');

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
		//{ label: 'Programme',		key: 'programme',		href: '/programme' },
		//{ label: 'Speakers',		key: 'speakers',		href: '/speakers' },
			//{ label: 'Tickets',		key: 'tickets',		href: '/tickets' },
			{ label: 'Past Editions',		key: 'past-editions',		href: '/past-editions' },
		
		
		];

	q = keystone.list('ContentControl').model.findOne().exec(function(err, result) {
		locals.footerLinks = [
		{label: 'Contact', key: 'contact', href: '/contact'},
		// {label: 'Terms & Conditions', key: 'legal', href: '/legal#terms-and-conditions'},
		// {label: 'Privacy Policy', key: 'legal', href: '/legal#privacy-policy'},
		{label: 'Bylaw for Poland 2.0', key: 'bylaw', href: result.bylawLink}
	];
		next(err);
	})
//	locals.user = req.user;
	
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;
	next();
	
};



/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
	
};

exports.initErrorHandlers = function(req, res, next) {
    
    res.err = function(err, title, message) {
        res.status(500).render('errors/500', {
            err: err,
            errorTitle: title,
            errorMsg: message
        });
    }
    
    res.notFound = function(title, message) {
        res.status(404).render('errors/404', {
            errorTitle: title,
            errorMsg: message
        });
    }
    
    next();
    
};


//if you need to filter by edition, use this middleware in index.js
exports.getCurrentEdition = function(req, res, next) {
		var q = keystone.list('Edition').model.findOne({'current':true});
		q.exec(function(err, result){
			if(result)
				res.locals.currentEdition = result;
			next(err);
		});
};

exports.loadSponsors = function(req, res, next) {
		let SponsorTypes = keystone.get('sponsor types');
		q = keystone.list('Edition').model.findOne({'current':true}).sort('sortOrder');
		q.exec(function(err, result) {
			var currentEdition = result;
			if(currentEdition) {
				var p = keystone.list('Sponsor').model.find().where('edition', currentEdition.id);
				p.exec(function(err,result) {
					//console.log('Sponsors: ', result);

					res.locals.sponsorList = [];
					for (var i = 0; i < SponsorTypes.length; ++i) {
						res.locals.sponsorList.push({type: SponsorTypes[i], list: result.filter(s => s.sponsorType == SponsorTypes[i])});
					}

					next(err);
				});
			}
			else next(err);
			
		});
};

exports.getContent = function(req,res,next) {
	q = keystone.list('ContentControl').model.findOne().exec(function(err,result) {
		if (result)
			res.locals.content = result;
		next(err);
	})
}

exports.loadControls = function(req,res,next) {
	q = keystone.list('ContentControl');
}

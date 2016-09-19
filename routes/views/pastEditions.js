var keystone = require('keystone');
var async = require('async');
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.title = 'Past Editions - Poland 2.0 Summit';
	locals.section = 'past-editions';

	function getEachRef(edition, ref, filter, sorts) {
		var schemas = {
			'speakers': 'Speaker',
			'teamMembers': 'TeamMember',
			'sponsors': 'Sponsor'
		};
		var schema = schemas[ref];
		// let propName = ref;
		return function(callback) {
			edition.getRefs(schema, filter).sort(sorts).exec(
				(err, results) => {
					edition[ref] = results;
					callback(err);
				});
		};
	}

	function getRefs(edition, callback) {
		edition.speakers  = [];
		edition.teamMembers = [];
		edition.sponsors = [];
		async.parallel(
			[
			getEachRef(edition, 'speakers', {}, 'sortOrder'),
			getEachRef(edition, 'teamMembers', {}, 'sortOrder'),
			getEachRef(edition, 'sponsors', {}, '')
			], callback
			);
	}

	function scaleImageHeight(photoUrl, height) {
		if (typeof(photoUrl) === 'string')
			return photoUrl.replace('upload/', `upload/c_scale,h_${height}/`);
		else
			throw new Error('[scale img] photoUrl must be string');
	}


	view.on('init', function(next) {
		
		var q = keystone.list('Edition').model.find({
			current: false
		}).sort('-year');//.populate('speaker sponsor');
		
		q.exec(function(err, result) {
			if (result) {
				locals.editions = result;
				async.each(result, getRefs, function() { 
					locals.editions.forEach(function(edition) {
						console.log(edition.fullName);
					 	console.log(edition.speakers);

						// console.log(edition.sponsors);
						// console.log(edition.teamMembers);
						if(edition.photos.length)
							edition.photos.forEach((photo) => { photo.url = scaleImageHeight(photo.secure_url, 400);});
					});
					next();
				});
			}
			else {
				locals.editions = [];
				next();
			}
		});
	});

	view.render('pastEditions');

};
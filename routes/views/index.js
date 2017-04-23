var keystone = require('keystone');
const scaleImg = require('../helpers/cloudinary').scaleImg;
exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var venue = locals.currentEdition.venue;
	var date = locals.currentEdition.date;
	var venueString = venue.name;
	var dateString = locals.currentEdition.dateString;
	locals.title = `Poland 2.0 Summit${(dateString || venueString) ? ' - ' : ''}
		${venueString}${venueString && dateString ? ', ' : ''}${date.dateString}`;
	locals.speakers = {regular: [], keynote: []};
	locals.section = 'home';



	view.on('init', function(next) {
		var q = keystone.list('Speaker').model.find({edition: locals.currentEdition.id}).sort('sortOrder');
		q.exec(function(err,result) {
			var regulars, keynotes;
			if (result.length) {

				regulars = result.filter(speaker => speaker.speakerType === 'regular');
				keynotes = result.filter(speaker => speaker.speakerType === 'keynote');
				regulars.forEach(speaker => {speaker.photo.url = scaleImg(speaker.photo.url, 350);});

				keynotes.forEach(speaker => {speaker.photo.url = scaleImg(speaker.photo.url, 350);});
				locals.speakers.regular = regulars;
				locals.speakers.keynote = keynotes;
			}

			next(err);
		});
	});



	view.render('index');

};

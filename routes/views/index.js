var keystone = require('keystone');
var cloudinary = require('cloudinary');
var agendaParser = require('../helpers/agendaParser');
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	var venue = locals.currentEdition.venue;
	var date = locals.currentEdition.date;
	var venueString = venue.name
	var dateString = date.dateString;
	locals.title = `Poland 2.0 Summit${(dateString || venueString) ? ' - ' : ''}
		${venueString}${venueString && dateString ? ', ' : ''}${date.dateString}`;

	locals.speakers = {regular: [], keynote: []};
	var regulars = locals.speakers.regular;
	var keynotes = locals.speakers.keynote;
	locals.section = 'home';
	function scaleImg(photoUrl, width) {
		if (typeof(photoUrl) === 'string')
			return photoUrl.replace('upload/', `upload/c_scale,w_${width}/`);
		else
			throw new Error('[scale img] photoUrl must be string');
	}

	//console.log(locals.sponsors);
	view.on('init', function(next) {
		var q = keystone.list('Speaker').model.find({edition: locals.currentEdition}).sort('sortOrder');
		q.exec(function(err,result) {
			var regulars, keynotes;
			if (result.length) {
				//console.log(result);
				regulars = result.filter(speaker => speaker.speakerType == 'regular');
				keynotes = result.filter(speaker => speaker.speakerType == 'keynote');
				regulars.forEach(speaker => {speaker.photo.url = scaleImg(speaker.photo.url, 600)});
				//console.log(regulars);
				keynotes.forEach(speaker => {speaker.photo.url = scaleImg(speaker.photo.url, 600)});
				locals.speakers.regular = regulars;
				locals.speakers.keynote = keynotes;
			}
			
			next(err);	
		});
	});
	view.on('init', function(next) {
		console.log(agendaParser);
		locals.agenda = agendaParser.parseAgenda(locals.content.agenda.md);

		/*
		Agenda is in the form of: [
		{caption, content}
		]
		content is in the form of:
		[
		{time, briefDescription, detailedDescription, speaker}]

		Speakers can be multiple
		*/
		next();
	})



	view.render('index');

};

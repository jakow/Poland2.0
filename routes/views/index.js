var keystone = require('keystone');
var agendaParser = require('../helpers/agendaParser');
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	var venue = locals.currentEdition.venue;
	var date = locals.currentEdition.date;
	var venueString = venue.name;
	var dateString = date.dateString;
	locals.title = `Poland 2.0 Summit${(dateString || venueString) ? ' - ' : ''}
		${venueString}${venueString && dateString ? ', ' : ''}${date.dateString}`;
	locals.speakers = {regular: [], keynote: []};
	locals.section = 'home';
	function scaleImg(photoUrl, width) {
		if (typeof(photoUrl) === 'string')
			return photoUrl.replace('upload/', `upload/c_scale,w_${width}/`);
		else
			// throw new Error('[scale img] photoUrl must be string');
			return ''; // fail silently
	}


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
	view.on('init', function(next) {
		
		locals.agenda = agendaParser.parseAgenda(locals.content.agenda.md);

		/*
		Agenda is in the form of: [
		{caption, content}
		]
		content is in the form of:
		[
		{time, briefDescription, detailedDescription, speaker}]

		*/
		next();
	});



	view.render('index');

};

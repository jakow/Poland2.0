var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	var currentEdition = locals.currentEdition;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'about';
	locals.title = 'About Poland 2.0 - Poland 2.0 Summit';
	locals.data = {
		team: []
	}
	function scaleImg(photoUrl, width) {
		if (typeof(photoUrl) === 'string')
			return photoUrl.replace('upload/', `upload/c_scale,w_${width},fl_progressive/`);
		else
			return ''; //fail silently...
	}


	view.on('init', function(next) {
		var q = keystone.list('TeamMember').model.find({edition: currentEdition}).sort('sortOrder'); //current edition - see middleware
		q.exec(function(err, result) {
			locals.data.team = result;
			locals.data.team.forEach((member, idx) =>
			{
				member.photo.small = scaleImg(member.photo.url, 400);
				member.photo.large = scaleImg(member.photo.url, 800);
			})
			next(err);
		});
	});
	// Render the view
	view.render('about');
	
};
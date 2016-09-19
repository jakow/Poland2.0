var keystone = require('keystone');


exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);

	var pageRoute = req.params.pageRoute;
	console.log('route: ', pageRoute);
	var locals = res.locals;


	locals.pageContent = '';

	view.on('init', function(next) {	
		var q = keystone.list('StaticPage').model.findOne({
			route: pageRoute,
			active: true
		});
		q.exec((err, result) => {
			if(!result) {
			console.log('static page not found');
			return res.notFound();
			}
			else {
				locals.pageContent = result.content;
				locals.title = result.name ? 
					(result.name + ' - ' + keystone.get('name')) : 
					keystone.get('name');
					next();
			}
		});
	});

	view.render('staticPage');
};
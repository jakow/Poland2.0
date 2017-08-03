const keystone = require('keystone');
const ContentControl = keystone.list('ContentControl');

exports = module.exports = function(done) {
  new ContentControl.model({title: 'Content Control'}).save(done);
};
const keystone = require('keystone');
const User = keystone.list('User');
 
 /*
  * Admin updates are executed by keystone so they are done in plain JS.
  */
exports = module.exports = function(done) {
  new User.model({
    name: 'Admin User', 
    isAdmin: true,
    email: 'admin@poland20.com',
    password: 'admin', 
  }).save(done);
};
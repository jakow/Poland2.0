const keystone = require('keystone'),
    User = keystone.list('User');
 
exports = module.exports = function(done) {
    
    new User.model({
        name: { first: 'Admin', last: 'User' },
        email: 'admin@poland20.com',
        password: 'admin',
        canAccessKeystone: true
    }).save(done);
    
};
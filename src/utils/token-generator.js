var jwt  = require( 'jsonwebtoken' );
var SALT = process.env.APP_SALT || '$2a$10$RSh34k8JX7./qG3ODWyae.';

module.exports = function ( data ) {
	return jwt.sign( {
		person   : data,
		success  : true,
		loggedin : true
	}, SALT, {
		expiresInMinutes : 60 // expires in 60 minutes
	} );
}

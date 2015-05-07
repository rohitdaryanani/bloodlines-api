var Person      = require( 'mongoose' ).model('Person');
var jwt         = require( 'jsonwebtoken' );
var superSecret = 'awesome';


module.exports = [
	{
		method : 'POST',
		path   : '/login',
		handler : function ( request, reply ) {
			request.payload = request.payload || {};
			var email       = request.payload.email;
			var password    = request.payload.password;

			var errorMessage = {
				error : 'invalid email or password'
			};

			if ( !email || !password ) {
				return reply( errorMessage );
			}

			Person.login( email, password, function (err, person) {
				if( err ) {
					return reply( errorMessage )
				}

				// generate token
				var token = jwt.sign( {
					email : email,
				}, superSecret, {
					expiresInMinutes : 1440 // expires in 24 hours
				} );

				reply( {
					person  : person,
					success : true,
					token   : token
				} );
			});
		}
	}
];

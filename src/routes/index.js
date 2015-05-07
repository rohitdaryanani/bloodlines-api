var Person      = require( 'mongoose' ).model('Person');
var jwt         = require( 'jsonwebtoken' );

var SALT = process.env.APP_SALT || '$2a$10$RSh34k8JX7./qG3ODWyae.';


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
					person   : person,
					success  : true,
					loggedin : true
				}, SALT, {
					expiresInMinutes : 60 // expires in 60 minutes
				} );

				reply( { token : token } );
			});
		}
	},

	{
		method : 'GET',
		path   : '/',
		config : {
			auth : 'token'
		},
		handler : function (request, reply) {
			reply('beep boop');
		}
	}
];

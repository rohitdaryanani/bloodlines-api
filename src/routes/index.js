var Person   = require( 'mongoose' ).model('Person');
var jwtToken = require('../utils/token-generator');

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
				var token = jwtToken( person )

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

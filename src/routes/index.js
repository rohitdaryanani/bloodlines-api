var Person = require( 'mongoose' ).model('Person');

module.exports = [
	{
		method : 'POST',
		path   : '/login',
		handler : function ( req, rep ) {
			req.payload = req.payload || {};
			var email = req.payload.email;
			var password = req.payload.password;
			
			var errorMessage = {
				error : 'invalid email or password'
			};
			
			if ( !email || !password ) {
				return rep( errorMessage ); 
			}
			
			Person.login( email, password, function (err, person) {
				if( err ) {
					return rep( errorMessage )
				}
				
				rep( person );
			});
		}
	}
];
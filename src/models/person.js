var moongose = require( 'mongoose' );
var bcrypt   = require('bcrypt');

var SALT = process.env.APP_SALT || '$2a$10$RSh34k8JX7./qG3ODWyae.';

var personSchema = moongose.Schema( {
    firstName      : String,
    lastName       : String,
    email          : {
    					type     : String,
    					unique   : true,
    					required : true
    				},
    password       : {
    					type : String,
    					required : true
    				},
    contactNumber  : Number,
    bloodType      : String
} );

personSchema.pre( 'save', function ( next ) {
	this.password = bcrypt.hashSync(this.password, SALT);
	next();
} )

module.exports = moongose.model('Person', personSchema);

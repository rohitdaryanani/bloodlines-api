/// <reference path="../../typings/node/node.d.ts"/>
var mongoose = require( 'mongoose' );
var bcrypt   = require('bcrypt');

var SALT = process.env.APP_SALT || '$2a$10$RSh34k8JX7./qG3ODWyae.';

var personSchema = mongoose.Schema( {
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

/**
 * checks if person is a registered user
 * @param  {[String]} email Unique email of the person
 * @param  {[String]} password Raw password provided by user
 * @param  {Function} cb A callback function for the person object
 * @return {[Object]} Returns person object
 */
personSchema.statics.login = function ( email, password, cb) {
	var Person = mongoose.model('Person');
	password   = bcrypt.hashSync( password, SALT );

	Person.findOne( { email : email, password : password }, function ( err, person ) {
		if ( person ) {
			return cb( null, person );
		}

		cb( err || new Error(), null );
	} );
}

mongoose.model('Person', personSchema);

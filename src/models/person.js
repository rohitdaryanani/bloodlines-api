var moongose = require( 'mongoose' );

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

module.exports = moongose.model('Person', personSchema);

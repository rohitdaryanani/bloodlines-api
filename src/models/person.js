var moongose = require( 'mongoose' );

var personSchema = moongose.Schema( {
    firstName      : String,
    lastName       : String,
    contactNumber  : Number,
    bloodType      : String,
    status         : String
} );

module.exports = moongose.model('Person', personSchema);

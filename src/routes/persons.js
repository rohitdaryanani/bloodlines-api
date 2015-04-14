var Person = require( '../models/person.js' );

module.exports = [
    {
        method  : 'GET',
        path    : '/persons',
        handler : function (request, reply) {
            Person.find( function ( err, persons ) {
                if ( err ) return console.error( err );
                reply( persons );
            } );
        }
    },
    {
        method  : 'GET',
        path    : '/person/{id}',
        handler : function ( request, reply ) {
            var id = request.params.id;
            Person.findOne( { _id : id}, function ( err, person ) {
                if ( err ) return console.error( err );
                reply( person );
            } )
        }
    },
    {
        method  : 'POST',
        path    : '/person',
        handler : function ( request, reply ) {
            var person  = new Person ( {
                'firstName'     : request.payload.firstName,
                'lastName'      : request.payload.lastName,
                'contactNumber' : request.payload.contactNumber,
                'bloodType'     : request.payload.bloodType,
                'status'        : request.payload.status
            } )
            person.save( function ( err, person ) {
                if ( err ) return console.error( err );
                reply( person );
            } );
        }
    },
    {
        method  : 'PUT',
        path    : '/person/{id}',
        handler : function ( request, reply ) {
            var id = request.params.id;
            Person.findOneAndUpdate (
                // query
                { _id : id },
                // update
                {   'firstName'     : request.payload.firstName,
                    'lastName'      : request.payload.lastName,
                    'contactNumber' : request.payload.contactNumber,
                    'bloodType'     : request.payload.bloodType,
                    'status'        : request.payload.status
                },
                // options
                { new : true },
                // callback
                function ( err, person ) {
                    if ( err ) return console.error( err );
                    reply( person );
                }
            )
        }
    },
    {
        method  : 'DELETE',
        path    : '/person/{id}',
        handler : function ( request, reply ) {
            var id = request.params.id;
            Person.findOneAndRemove(
                // query
                { _id : id },
                // callback
                function  ( err, person ) {
                    if ( err ) return console.error( err );
                    reply( person );
                }
            )
        }
    }
]

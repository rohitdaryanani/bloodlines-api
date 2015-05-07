var Person = require( 'mongoose' ).model('Person');

module.exports = [
    {
        method  : 'GET',
        path    : '/persons',
        handler : function (request, reply) {
            Person.find( function ( err, person ) {
                if ( err ) return reply ( {
                    'statusCode' : '200',
                    'error'      : 'Error getting persons'
                } );
                reply( person );
            } );
        }
    },
    {
        method  : 'GET',
        path    : '/persons/{id}',
        handler : function ( request, reply ) {
            var id = request.params.id;
            Person.findOne( { _id : id}, function ( err, person ) {
                if ( err ) return reply( {
                    'statusCode' : 200,
                    'error'      : 'Error person not found'
                } );
                reply( person );
            } )
        }
    },
    {
        method  : 'POST',
        path    : '/persons',
        handler : function ( request, reply ) {
            var person  = new Person ( {
                'firstName'     : request.payload.firstName,
                'lastName'      : request.payload.lastName,
                'email'         : request.payload.email,
                'password'      : request.payload.password,
                'contactNumber' : request.payload.contactNumber,
                'bloodType'     : request.payload.bloodType
            } )
            person.save( function ( err, person ) {
                if ( err ) return reply( {
                    'statusCode' : '200',
                    'error'      : err,
                    'message'    : 'Error creating person'
                } );
                reply( person );
            } );
        }
    },
    {
        method  : 'PUT',
        path    : '/persons/{id}',
        config : {
        	auth : 'token'
        },
        handler : function ( request, reply ) {
            var id = request.params.id;
            Person.findOneAndUpdate (
                // query
                { _id : id },
                // update
                request.payload
                ,
                // options
                { new : true },
                // callback
                function ( err, person ) {
                    if ( err ) return reply( {
                        'statusCode' : '200',
                        'error'      : err,
                        'message'    : 'Error updating person'
                    } );
                    var _person = person.toJSON();
                    delete _person.password;
                    reply( _person );
                }
            )
        }
    },
    {
        method  : 'DELETE',
        path    : '/persons/{id}',
        handler : function ( request, reply ) {
            var id = request.params.id;
            Person.findOneAndRemove(
                // query
                { _id : id },
                // callback
                function  ( err, person ) {
                    if ( err ) return reply( {
                        'statusCode' : '200',
                        'error'      : err,
                        'message'    : 'Error removing a person'
                    } );
                    reply( person );
                }
            )
        }
    }
]

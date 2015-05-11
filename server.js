'use strict';

var Hapi     = require( 'hapi' );
var Good     = require( 'good' );
var _        = require( 'lodash' );
var mongoose = require( 'mongoose' );

var SALT = process.env.APP_SALT || '$2a$10$RSh34k8JX7./qG3ODWyae.';
var PORT = process.env.PORT || 8000;

// connect to mongo
mongoose.connect( 'mongodb://localhost/test' );
require('./src/models/person');

// routes
var pageRoutes = _.union(require( './src/routes/persons' ), require( './src/routes/index' ) );

// server config
var server = new Hapi.Server();

// inject server for test
module.exports = server.connection({
    port: PORT
});


server.register([ require('hapi-auth-jwt'),  {
    register: Good,
    options: {
        reporters: [ {
            reporter: require( 'good-console' ),
            args: [ {
                log: '*',
                response: '*'
            } ]
        } ]
    }
} ], function ( err ) {
    if ( err ) {
        return console.log('plugin not successfully loaded!');
    }

    server.auth.strategy( 'token', 'jwt', {
    	key : SALT
    } );

	// populate route
	server.route( pageRoutes );

    if ( !module.parent ) {
        server.start( function () {
            console.log('info', 'Server running at:', server.info.uri );
        } );
    }

});


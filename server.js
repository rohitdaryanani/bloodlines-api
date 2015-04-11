'use strict'

var Hapi = require('hapi');
var Good = require('good');

// routes
var persons = require( './src/routes/persons' )

// server config
var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: '8000'
});

// populate route
var routes  = [ persons ]
server.route(routes);

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require( 'good-console' ),
            args: [{
                log: '*',
                response: '*'
            }]
        }]
    }
}, function ( err ) {
    if ( err ) {
        throw err;
    }

    server.start( function () {
        server.log('info', 'Server running at:', server.info.uri );
    });

})


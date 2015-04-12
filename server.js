'use strict'

var Hapi = require('hapi');
var Good = require('good');
var _    = require('lodash');

// routes
var pageRoutes = _.union(require( './src/routes/persons' ));

// server config
var server = new Hapi.Server();
module.exports = server.connection({
    host: 'localhost',
    port: '8000'
});

// populate route
server.route(pageRoutes);

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

    if (!module.parent) {
        server.start( function () {
            server.log('info', 'Server running at:', server.info.uri );
        });
    }

})


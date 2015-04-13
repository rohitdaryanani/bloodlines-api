'use strict'

var Hapi     = require('hapi');
var Good     = require('good');
var _        = require('lodash');
var mongoose = require( 'mongoose' );


// connect to mongo
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('yey');
});

// routes
var pageRoutes = _.union(require( './src/routes/persons' ));

// server config
var server = new Hapi.Server();
module.exports = server.connection({
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


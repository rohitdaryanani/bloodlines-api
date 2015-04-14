var Code = require('code');
var Lab  = require('lab');
var lab  = exports.lab = Lab.script();

var describe = lab.describe;
var it       = lab.it;
var before   = lab.before;
var after    = lab.after;
var expect   = Code.expect;

var server = require( '../server' );


describe('Persons', function () {
    it( 'should get lists of persons', function ( done ) {
        var options = {
            method : "GET",
            url    : "/persons"
        };

        server.inject(options, function ( response ) {
            var result = response.result;

            expect( response.statusCode ).to.equal( 200 );
            expect( result ).to.be.instanceof( Array );

            done();
        } );
    } )

    it( 'should be able to add a valid person', function ( done ) {
        var options = {
            method  : "POST",
            url     : "/person",
            payload : {
                'firstName'      : 'emma',
                'lastName'       : 'roberts',
                'contactNumber'  : 69,
                'bloodType'      : 'B+',
                'status'         : 'donator'
            }
        };

        server.inject(options, function ( response ) {
            var payload = JSON.parse(response.payload);

            expect( response.statusCode ).to.equal( 200 );
            expect( payload.firstName ).to.equal( options.payload.firstName );
            expect( payload.lastName ).to.equal( options.payload.lastName );
            expect( payload.contactNumber ).to.equal( options.payload.contactNumber );
            expect( payload.bloodType).to.equal( options.payload.bloodType );
            expect( payload.status ).to.equal( options.payload.status );

            done();
        } )
    } )
} );

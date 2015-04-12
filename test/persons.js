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
            expect( result ).to.have.length( 2 );

            done();
        } );
    } )

    it( 'should be able to add a valid person', function ( done ) {
        var options = {
            method  : "POST",
            url     : "/person",
            payload : {
                'addPerson.firstName'      : 'emma',
                'addPerson.lastName'       : 'roberts',
                'addPerson.contactNumber'  : 69,
                'addPerson.bloodType'      : 'B+',
                'addPerson.status'         : 'donator'
            }
        };

        server.inject(options, function ( response ) {
            var result  = response.result;
            var payload = options.payload;

            expect( response.statusCode ).to.equal( 200 );
            expect( result.firstName ).to.equal( payload.firstName );
            expect( result.lastName ).to.equal( payload.lastName );
            expect( result.contactNumber ).to.equal( payload.contactNumber );
            expect( result.bloodType).to.equal( payload.bloodType );
            expect( result.status ).to.equal( payload.status );

            done();
        } )
    } )
} );

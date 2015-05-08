var Code = require('code');
var Lab  = require('lab');
var path = require('path');
var lab  = exports.lab = Lab.script();

var describe = lab.describe;
var it       = lab.it;
var before   = lab.before;
var after    = lab.after;
var expect   = Code.expect;

var server   = require( '../server' );
var jwtToken = require('../src/utils/token-generator');

var peoplejson = require('fs').readFileSync(path.join(__dirname, '../people.json'));
	peoplejson = peoplejson.toString();
	peoplejson = peoplejson.replace(/\n/g, ',').replace(/.$/g, '');
	peoplejson = '[' + peoplejson.split('\n').join(',') + ']';

var people = JSON.parse(peoplejson);

var token = jwtToken( people[ 0 ] );

describe( 'Persons', function () {

	describe( 'GET', function () {

		it( 'should GET a specific person by id', function ( done ) {
			var options = {
				method : 'GET',
				url    : '/persons/' + people[0]._id['$oid']
			};

			server.inject( options, function ( response ) {
				var result = response.result;

				expect( response.statusCode ).to.equal( 200 );
				expect( result ).to.be.an.object();
				expect( result.firstName ).to.equal( people[0].firstName );
				expect( result.lastName ).to.equal( people[0].lastName );
				expect( result.email ).to.equal( people[0].email );
				expect( result.password ).to.equal( people[0].password );
				expect( result.contactNumber ).to.equal( people[0].contactNumber );
				expect( result.bloodType ).to.equal( people[0].bloodType );

				done();
			} )
		} )

	    it( 'should handle GET with a invalid id', function ( done ) {
	        var options = {
	            method : 'GET',
	            url    : '/persons/552cb675ead3b564d324'
	        }

	        server.inject( options, function ( response ) {
	            var result = response.result;

	            expect( response.statusCode ).to.equal( 200 );
	            expect( result.error ).to.equal( 'Error person not found' );

	            done();
	        })
	    } )

	    it( 'should GET lists of persons', function ( done ) {
	        var options = {
	            method : 'GET',
	            url    : '/persons'
	        };

	        server.inject(options, function ( response ) {
	            var result = response.result;

	            expect( response.statusCode ).to.equal( 200 );
	            expect( result ).to.be.an.array();

	            done();
	        } );
	    } )

	} );

	describe( 'POST', function () {

		it( 'should be able to add a valid person', function ( done ) {
		    var options = {
		        method  : 'POST',
		        url     : '/persons',
		        payload : {
		            'firstName'     : 'john',
		            'lastName'      : 'doe',
		            'email'         : 'rohitdaryanani@live.com',
		            'password'      : '123456',
		            'contactNumber' : 123456,
		            'bloodType'     : 'O'
		        }
		    };

		    server.inject(options, function ( response ) {
		        var payload = JSON.parse(response.payload);

		        expect( response.statusCode ).to.equal( 200 );
		        expect( payload.firstName ).to.equal( options.payload.firstName );
		        expect( payload.lastName ).to.equal( options.payload.lastName );
		        expect( payload.email ).to.equal( options.payload.email );
		        expect( payload.contactNumber ).to.equal( options.payload.contactNumber );
		        expect( payload.bloodType).to.equal( options.payload.bloodType );
		        expect( payload.status ).to.equal( options.payload.status );

		        done();
			} );
		} );

		it( 'should not be able to add a person with invalid data', function ( done ) {
		    var options = {
		        method  : 'POST',
		        url     : '/persons',
		        payload : {
		        	    'firstName'     : 'john',
		        	    'lastName'      : 'doe',
		        	    'email'         : 'rohitdaryanani@live.com',
		        	    'password'      : '123456',
		        	    'contactNumber' : 123456,
		        	    'bloodType'     : 'O'
		        	}
		    };

		    server.inject(options, function ( response ) {
		        var result = response.result;

		        expect( response.statusCode ).to.equal( 200 );
		        expect( result.message ).to.equal( 'Error creating person' );

		        done();
			} );
		} );

	} )

	describe( 'PUT', function () {

		it( 'should be able to update a person', function ( done ) {
			var options = {
				method  : 'PUT',
				url     : '/persons/5534d40505a4630df1eaef49',
				payload : {
					'firstName' : 'Sakdip'
				},
				headers : {
					Authorization : 'Bearer ' + token
				}
			};

			server.inject( options, function ( response ) {
				var payload = JSON.parse( response.payload );

				expect( payload.firstName ).to.equal( options.payload.firstName );
				expect( response.statusCode ).to.equal( 200 );
				done();
			} )
		} );

		it( 'should not be able to update a person if data is invalid', function ( done ) {
			var options = {
				method  : 'PUT',
				url     : '/persons/5534d40505a4630df1eaef49',
				payload : {
					'contactNumber' : 'dsdsds'
				},
				headers : {
					Authorization : 'Bearer ' + token
				}
			};

			server.inject( options, function ( response ) {
				var result = response.result;

				expect( response.statusCode ).to.equal( 200 );
				expect( result.message ).to.equal( 'Error updating person' );
				done();
			} );
		} );

	} );

	describe('DELETE', function () {

		it( 'should be able to delete a person', function ( done ) {
			var options = {
				method : 'DELETE',
				url    : '/persons/5534d61405a4630df1eaef4c',
			}

			server.inject( options, function ( response ) {
				expect( response.statusCode ).to.equal( 200 );
				done();
			} );
		} );

		it( 'should handle if invalid id is used', function ( done ) {
			var options = {
				method : 'DELETE',
				url    : '/persons/5534d61405a4630df1e4c',
			}

			server.inject( options, function ( response ) {
				var result = response.result;

				expect( response.statusCode ).to.equal( 200 );
				expect( result.message ).to.equal( 'Error removing a person' );
				done();
			} );
		})
	} );

} );

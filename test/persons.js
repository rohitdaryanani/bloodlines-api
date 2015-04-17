var Code = require('code');
var Lab  = require('lab');
var path = require('path');
var lab  = exports.lab = Lab.script();

var describe = lab.describe;
var it       = lab.it;
var before   = lab.before;
var after    = lab.after;
var expect   = Code.expect;

var server = require( '../server' );

var peoplejson = require('fs').readFileSync(path.join(__dirname, '../people.json'));
	peoplejson = peoplejson.toString();
	peoplejson = peoplejson.replace(/\n/g, ',').replace(/.$/g, '');
	peoplejson = '[' + peoplejson.split('\n').join(',') + ']';

var people = JSON.parse(peoplejson);

describe( 'Persons', function () {

	describe( 'GET', function () {
		it( 'should GET a specific person by id', function ( done ) {
			var options = {
				method : 'GET',
				url    : '/person/' + people[0]._id['$oid']
			};

			server.inject( options, function ( response ) {
				var result = response.result;

				expect( response.statusCode ).to.equal( 200 );
				expect( result ).to.be.an.object();
				expect( result.firstName ).to.equal( people[0].firstName );
				expect( result.lastName ).to.equal( people[0].lastName );
				expect( result.contactNumber ).to.equal( people[0].contactNumber );
				expect( result.bloodType ).to.equal( people[0].bloodType );
				expect( result.status ).to.equal( people[0].status );

				done();
			} )
		} )

	} );

} );

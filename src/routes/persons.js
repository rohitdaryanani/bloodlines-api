var data = [
    {
        firstName : 'John',
        lastName  : 'Doe',
        contactNumber : '12345689',
        bloodType : 'B+',
        status : 'donator'
    },
    {
        firstName : 'Jane',
        lastName  : 'Doe',
        contactNumber : '96969696',
        bloodType : 'AB',
        status : 'donatee'
    }
]

module.exports = {
    method: 'GET',
    path: '/persons',
    handler: function (request, reply) {
        reply( data );
    }
}

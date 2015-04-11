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

module.exports = [
    {
        method: 'GET',
        path: '/persons',
        handler: function (request, reply) {
            reply( data );
        }
    },
    {
        method: 'POST',
        path: '/person',
        handler: function (request, reply) {
            var addPerson = {
                'firstName'      : request.payload.firstName,
                'lastName'       : request.payload.lastName,
                'contactNumber'  : request.payload.contactNumber,
                'bloodType'      : request.payload.bloodType,
                'status'         : request.payload.status,
            }
            data.push(addPerson);
            reply('done');
        }
    }
]

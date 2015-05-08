#BLOODLINES-API [![Build Status](https://api.shippable.com/projects/551107755ab6cc1352a8f311/badge?branchName=dev)](https://app.shippable.com/projects/551107755ab6cc1352a8f311/builds/latest) [![Gittip](http://img.shields.io/gratipay/alis894.svg)](https://www.gittip.com/alis894/)
## Description

Bloodlines is just a simple posting platform for people who are willing to donate blood, powered by [**node.js**](http://nodejs.org)and [**hapijs**](http://hapijs.com/) web framework, [**mongodb**](http://mongodb.com) for the database, It's pretty simple and no fancy stuff, just pure api.

[ Documentation ](http://rohitdaryanani.com/bloodlines/) Work in progress

### Dependencies

- **Hapi** -  Web framework
- **Mongoose** - Object Document Mapper
- **JWT** - Handles authentication

### Setup

- **Install MongoDB**
  - ` $ brew install mongodb ` on **Mac**
  - ` $ sudo apt-get install mongodb ` on **Ubuntu**

- **Download and Run**
  - ` $ git clone https://github.com/rohitdaryanani/bloodlines.git && cd bloodlines ` will download the app, and cd to the folder once done.
  - ` $ mongod & ` to run mongodb daemon on the background
  - ` $ npm install ` should download and install all the dependencies
  - Now do ` $ node app.js ` to start the http server, and  then go ahead and visit this url in your browser ` http://localhost:8000 `

### Test

To run test just tye make, this runs the make file and does the following:

- Populates DB
- Runs test's via npm test
- Cleans up DB

### Credits

- Code [ me ](http://github.com/rohitdaryanani)
- Documentation [ me ](http://github.com/rohitdaryanani)


### License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014-2015 [ Rohit Daryanani ](http://rohitdaryanani.com/)

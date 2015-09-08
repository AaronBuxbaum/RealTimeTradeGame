//Dependencies
var express = require('express');
var server = express();

//Open a port and serve pages through it
function listen(port) {
	server.use(express.static(__dirname));
	server.all('/*', function (request, response) {
		return response.redirect('/src/');
	});
	server.listen(port);
	console.log("Server listening on port", port);
}

//Start the server
listen(process.env.PORT || 8080);

//Start portfolio updater
require('./server-scripts/portfolio-updater.js').initialize();
var static = require('node-static');
var SERVER_PORT = 8085;
var fileServer = new static.Server('./public');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response, function (e, res) {
            if (e && (e.status === 404)) { // If the file wasn't found
                fileServer.serveFile('/not-found.html', 404, {}, request, response);
            }
        });
    }).resume();
}).listen(SERVER_PORT);

console.log('Server running at http://127.0.0.1:'+SERVER_PORT+'/');
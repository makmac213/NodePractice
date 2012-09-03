var http        = require("http");
var querystring = require("querystring");
var url         = require("url");
var fs          = require("fs");

var SETTINGS = {
	'APP_DIRECTORY' : {
		// absolute path doesn't work (Could not open file: Error: ENOENT)
		// 'TEMPLATES' : '/home/markallan/Templates'
		'TEMPLATES' : __dirname + '/templates'
	}
};

var DS = '/';

http.createServer(function(request, response) {
	requestLogger(request)
	processRequest(request, response);
	response.end();
}).listen(8888);


// log all requests
function requestLogger(request){
	
}

// request handler
function processRequest(request, response){
	requestData = url.parse(request.url);
	if(requestData.pathname != '/favicon.ico'){
		if(requestData.pathname.substr(-3)=='css'){
			retVal = readfile(requestData.pathname);
			response.writeHead(200, {"Content-Type": "text/css"});
		}else{
			retVal = readfile(requestData.pathname);
			response.writeHead(200, {"Content-Type": "text/html"});
		}
		response.write(retVal)
		response.write(SETTINGS.APP_DIRECTORY.TEMPLATES + requestData.pathname);
	}
}

// template reader
function readfile(filename){
	return fs.readFileSync(SETTINGS.APP_DIRECTORY.TEMPLATES + filename, 'ascii', function(err, data) {
				if(err) {
					console.error("Could not open file: %s", err);
					process.exit(1);
				}
				return data;
			});	
}

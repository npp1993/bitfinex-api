/*
Author: Nathaniel Pawelczyk
A node.js wrapper for the Bitfinex API
*/

var request = require("request");
var microtime = require("microtime");
var querystring = require("querystring");
var crypto = require("crypto");

function Bitfinex(key, secret) {

	var settings = {
		url: "https://api.bitfinex.com/",
		version: "v1",
		key: key,
		secret: secret
	};
	
	function unauthenticated_call(path, callback) {
	
		var url = "/" + settings.version + path;
		
		request({url: url, method: "GET"}, callback);
	}
	
	function authenticated_call(path, parameters, callback) {
	
		var options = {};
		
		var payload = new Buffer(JSON.stringify(options)).toString("base64");
		var signature = crypto.createHmac("sha384", options).update(payload).digest("hex");
		
		var headers = {
			X-BFX-APIKEY: key;
			X-BFX-PAYLOAD: payload;
			X-BFX-SIGNATURE: signature;
		}
		
		request({url: url, method: "POST", headers: headers}, callback);
	}
	
	function ticker(symbol, callback) {
	
		var path = "/ticker/" + symbol;
		
		unauthenticated_call(path, callback);
	}
	
}

module.exports = Bitfinex;
/*
Author: Nathaniel Pawelczyk
A node.js wrapper for the Bitfinex API
*/

var request = require("request");
var crypto = require("crypto");

function Bitfinex(key, secret) {

	var settings = {
		base: "https://api.bitfinex.com",
		version: "/v1",
		key: key,
		secret: secret,
		_nonce: Date.now()
	};
	
	function nonce() {
		return settings._nonce++;
	}
	
	function unauthenticated_call(path, callback) {
	
		var url = settings.base + settings.version + path;
		
		request({url: url, method: "GET"}, callback);
	}
	
	function authenticated_call(path, parameters, callback) {
	
		var options = {
			request: settings.version + path,
			nonce: JSON.stringify(nonce()),
		};
		
		for(key in parameters) {
			options[key] = parameters[key];
		}
		
		var payload = new Buffer(JSON.stringify(options)).toString("base64");
		var signature = crypto.createHmac("sha384", options).update(payload).digest("hex");
		
		var headers = {
			"X-BFX-APIKEY": key,
			"X-BFX-PAYLOAD": payload,
			"X-BFX-SIGNATURE": signature
		}
		
		request({url: url, method: "POST", headers: headers}, callback);
	}
	
	//unauthenticated methods
	
	function ticker(symbol, callback) {
		var path = "/ticker/" + symbol;
		unauthenticated_call(path, callback);
	}
	
	function lendbook(currency, callback) {
		var path = "/lendbook/" + currency;
		unauthenticated_call(path, callback);
	}
	
	function orderbook(symbol, callback) {
		var path = "/orderbook/" + symbol;
		unauthenticated_call(path, callback);
	}
	
	function trades(symbol, callback) {
		var path = "/trades/" + symbol;
		unauthenticated_call(path, callback);
	}
	
	function lends(currency, callback) {
		var path = "/lends/" + currency;
		unauthenticated_call(path, callback);
	}
	
	function symbols(callback) {
		var path = "/symbols";
		unauthenticated_call(callback);
	}
	
	//authenticated methods
	
	function new_order(options, callback) {
		var path = "/order/new";
		authenticated_call(path, options, callback);
	}
	
	function multi_order(options, callback)
	{
		var path = "/order/new/multi";
		authenticated_call(path, options, callback);
	}
	
	function cancel_order(options, callback)
	{
		var path = "/order/cancel";
		authenticated_call(path, options, callback);
	}
	
	function cancel_multi(options, callback)
	{
		var path = "/order/cancel/multi";
		authenticated_call(path, options, callback);
	}
	
	function order_status(options, callback)
	{
		var path = "/order/status";
		authenticated_call(path, options, callback);
	}
	
	function active_orders(options, callback)
	{
		var path = "/orders";
		authenticated_call(path, options, callback);
	}
	
	function active_positions(options, callback)
	{
		var path = "/positions";
		authenticated_call(path, options, callback);
	}
	
	function past_trades(options, callback)
	{
		var path = "/mytrades";
		authenticated_call(path, options, callback);
	}
	
	function new_offer(options, callback)
	{
		var path = "/offer/new";
		authenticated_call(path, options, callback);
	}
	
	function cancel_offer(options, callback)
	{
		var path = "/offer/cancel";
		authenticated_call(path, options, callback);
	}
	
	function offer_status(options, callback)
	{
		var path = "/offer/status";
		authenticated_call(path, options, callback);
	}
	
	function active_offers(options, callback)
	{
		var path = "/offers";
		authenticated_call(path, options, callback);
	}
	
	function active_credits(options, callback)
	{
		var path = "/credits";
		authenticated_call(path, options, callback);
	}
	
	function balances(options, callback)
	{
		var path = "/balances";
		authenticated_call(path, options, callback);
	}
	
	this.ticker = ticker;
	this.lendbook = lendbook;
	this.orderbook = orderbook;
	this.trades = trades;
	this.lends = lends;
	this.symbols = symbols;
	
	this.new_order = new_order;
	this.multi_order = multi_order;
	this.cancel_order = cancel_order;
	this.cancel_multi = cancel_multi;
	this.order_status = order_status;
	this.active_orders = active_orders;
	this.active_positions = active_positions;
	this.past_trades = past_trades;
	this.new_offer = new_offer;
	this.cancel_offer = cancel_offer;
	this.offer_status = offer_status;
	this.active_offers = active_offers;
	tihs.active_credits = active_credits;
	this.balances = balances;
}

module.exports = Bitfinex;
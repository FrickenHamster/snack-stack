/**
 * Created by alexanderyan on 7/14/16.
 */
'use strict'

var express = require('express');


var app = express();

app.use(express.static('public'));


var server = app.listen(3154, function()
{
	let port = server.address().port;
	serverLog("Server started on port " + port);
});


function serverLog(str) 
{
	var date = new Date();
	var dtext = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	console.log(dtext + "-" + str);
}

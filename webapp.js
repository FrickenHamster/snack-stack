/**
 * Created by alexanderyan on 7/14/16.
 */
'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;

let db;
let app = express();
let server;

app.use(express.static('public'));


app.get("/api/snacks", function (req, res)
{
	serverLog("GET snacks");
	db.collection("snacks").find().toArray(function (err, docs)
	{
		res.json(docs);
	})
});

app.use(bodyParser.json());
app.post("/api/snacks", function (req, res)
{
	serverLog("POST snack" + req.body);
	let newSnack = req.body;
	newSnack.score = 0;
	db.collection("snacks").insertOne(newSnack, function (err, result)
	{
		if (err)
			console.log(err);
			let newID = result.insertedId;
			db.collection("snacks").find({_id: newID}).next(function(err, doc)
			{
				if (err)
					console.log(err);
				res.json(doc);
			})
	});
});

app.put("/api/snack/:id/vote", function (req, res)
{
	serverLog("PUT vote" + req.params.id);
	//db.collection("votes").find()
	let oid = ObjectID(req.params.id);
	let change = 0;
	if (req.body.vote === "up")
	{
		change = 1;
	}
	else if (req.body.vote === "down") 
	{
		change = -1;
	}
	else 
	{
		res.json(req.body);
		return;
	}
	let modSnack;
	db.collection("vote").findOne({_id: oid}, function(err, snack)
	{
	db.collection("snacks").findOne({_id: oid}, function(err, snack)
	{
		if (err)
			console.log(err);
		modSnack = snack;

		if (!modSnack.score)
			modSnack.score = 0;
		modSnack.score += change;
		db.collection("snacks").updateOne({_id: oid}, modSnack, function(err, result)
		{
			if(err)
				console.log(err);
			res.json(modSnack.score);
		});
	});
	
});

MongoClient.connect('mongodb://localhost:27017/snacks', function (err, dbConnection)
{
	if (err)
		console.log(err);
	db = dbConnection;
	server = app.listen(3154, function ()
	{
		let port = server.address().port;
		serverLog("Server started on port " + port);
	});
});


function serverLog(str)
{
	var date = new Date();
	var dtext = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	console.log(dtext + "-" + str);
}

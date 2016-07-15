#!/usr/bin/mongo

var db = new Mongo().getDB("snackdb");

db.snacks.remove({});

db.snacks.insert([
	{
		name: "Blueberries",
		score: 4
	},
	{
		name: "Honest Kids Juice Boxes",
		score: 5
	}
]);

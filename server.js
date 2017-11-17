var express = require('express');
var app=express();
//creation client

var mongoClient=require("mongodb").MongoClient;
//creation var db
var url="mongodb://localhost:27017/blablavroum";

//connection db
mongoClient.connect(url,function(err,db){

	//requête prenom
	app.get("/membres/prenom/:prenom",function(req,res){
		db.collection("membres").find({"prenom":req.params.prenom})
			.toArray(function(err,documents){
		//récuperation du résultat
		var json=JSON.stringify(documents);
		//renvoie du resultat
		res.setHeader("Content-type","application/json");

		res.end(json);
		});
	}); 

	//requête nom
	app.get("/membres/nom/:nom",function(req,res){
		db.collection("membres").find({"nom":req.params.prenom})
			.toArray(function(err,documents){
		//récuperation du résultat
		var json=JSON.stringify(documents);
		//renvoie du resultat
		res.setHeader("Content-type","application/json");

		res.end(json);
		});
	}); 

 
});

app.listen(8888);

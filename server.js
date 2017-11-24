var express = require('express');
var app=express();
//creation client

var mongoClient=require("mongodb").MongoClient;
//creation var db
var url="mongodb://localhost:27017/Covoit";

var sendRes = function(res, json){
    res.setHeader("Content-type","application/json");
    res.end(json);
}

//connection db
mongoClient.connect(url,function(err,db){


    //requête tous le smembres
    app.get("/membres",function(req,res){
        db.collection("membres").find()
            .toArray(function(err,documents){
                //récuperation du résultat
                var json=JSON.stringify(documents);
                //renvoi du resultat
                sendRes(res, json);

            });
    });

    //requête prenom
    app.get("/membres/prenom/:prenom",function(req,res){
        db.collection("membres").find({"prenom":req.params.prenom})
            .toArray(function(err,documents){
                //récuperation du résultat
                var json=JSON.stringify(documents);
                //renvoi du resultat
                sendRes(res, json);
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

    //Ajoute un membre
    app.put("/membres/add/:nom/:prenom/:mail",function(req,res){
        db.collection("membres").insertOne({
            'nom':req.params.nom,
            'prenom':req.params.prenom,
            'mail':req.params.mail
        });
    });

    //Retire un membre
    app.delete("/membres/:mail/",function(req,res){
        db.collection("membres").remove({'mail':req.params.mail});
    });

    /////////////////////////////////////////
    //requête tous les trajets
    app.get("/trajets",function(req,res){
        db.collection("trajets").find()
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

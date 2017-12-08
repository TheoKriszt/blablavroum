var express = require('express');
var app=express();
var cors = require("cors");
app.use(cors());
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


    //requête tous les smembres
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

    ////////////////  == TRAJETS ==  /////////////////////////
    //requête tous les trajets
    app.get("/trajets",function(req,res){
        db.collection("trajets").find()
            .toArray(function(err,documents){
                //récuperation du résultat
                var json=JSON.stringify(documents);
                //renvoie du resultat
                res.setHeader("Content-type","application/json");
                res.setHeader("Access-Control-Allow-Origin", "*");

                res.end(json);
            });
    });

    app.get("/trajets/:villed/:villea",function(req,res){
        db.collection("trajets").find({'depart.ville': req.params.villed, 'arrivee.ville': req.params.villea})
            .toArray(function(err,documents){
                //récuperation du résultat
                var json=JSON.stringify(documents);
                //renvoie du resultat
                res.setHeader("Content-type","application/json");
                res.setHeader("Access-Control-Allow-Origin", "*");

                res.end(json);
            });
    });

    app.get("/trajets/:villed/:villea/:dateDepart",function(req,res){

        // changer de aaaa-mm-jj
        // vers jj:mm:aaaa
        var dateIn = req.params.dateDepart.split('-');
        var dateOut = dateIn[2] + "-" + dateIn[1] + "-" + dateIn[0];

        console.log("Demande de trajet par date : " + req.params.dateDepart);
        console.log(dateIn);
        console.log(dateOut);



        db.collection("trajets").find({'depart.ville': req.params.villed, 'arrivee.ville': req.params.villea, 'date': {$ge: dateOut}})
            .toArray(function(err,documents){
                //récuperation du résultat
                var json=JSON.stringify(documents);
                //renvoie du resultat
                res.setHeader("Content-type","application/json");
                res.setHeader("Access-Control-Allow-Origin", "*");

                res.end(json);
                console.log(json);
            });
    });

 
});

app.listen(8888);

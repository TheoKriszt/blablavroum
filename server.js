var express = require('express');
var app=express();
var cors = require("cors");
app.use(cors());

//creation client

var mongoClient=require("mongodb").MongoClient;
//creation var db
var url="mongodb://localhost:27017/Covoit";

var sendRes = function(res, json){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-type","application/json");
    res.end(json);
};

//connection db
mongoClient.connect(url,function(err,db){
    const database = db.db('Covoit'); // accès nommé à le DB, parce que mongo ne reconnait plus simplement dc.collection sur les nouvelles versions


    if (err){
        return console.log(err)
    } else{
        console.log("connected to " + url);
        // console.log("mongo version : " + db.version())
    }
    //requête tous les smembres
    app.get("/membres",function(req,res){
        console.log("Recupération des membres");
        database.collection("membres").find()
        // db.collection("membres").find()
            .toArray(function(err,documents){
                //récuperation du résultat
                var json=JSON.stringify(documents);
                //renvoi du resultat
                sendRes(res, json);

            });
    });

    //requête prenom
    app.get("/membres/prenom/:prenom",function(req,res){
        database.collection("membres").find({"prenom":req.params.prenom})
            .toArray(function(err,documents){
                //récuperation du résultat
                var json=JSON.stringify(documents);
                //renvoi du resultat
                sendRes(res, json);
            });
    });

    //requête nom
    app.get("/membres/nom/:nom",function(req,res){
        database.collection("membres").find({"nom":req.params.prenom})
            .toArray(function(err,documents){
                //récuperation du résultat
                var json=JSON.stringify(documents);
                sendRes(res, json)
            });
    });

    //Ajoute un membre
    app.put("/membres/add/:nom/:prenom/:mail",function(req,res){
        database.collection("membres").insertOne({
            'nom':req.params.nom,
            'prenom':req.params.prenom,
            'mail':req.params.mail
        });
    });

    //Retire un membre
    app.delete("/membres/:mail/",function(req,res){
        database.collection("membres").remove({'mail':req.params.mail});
    });

    ////////////////  == TRAJETS ==  /////////////////////////
    //requête tous les trajets
    app.get("/trajets",function(req,res){
        database.collection("trajets").find()
            .toArray(function(err,documents){
                //récuperation du résultat
                var json=JSON.stringify(documents);
                sendRes(res, json)
            });
    });

    app.get("/trajets/:villed/:villea",function(req,res){
        console.log("Recherche des trajets de " + req.params.villed + " à " + req.params.villea);
        database.collection("trajets").find({'depart.ville': req.params.villed, 'arrivee.ville': req.params.villea})
            .toArray(function(err,documents){
                //récuperation du résultat
                var json=JSON.stringify(documents);
                //renvoi du resultat
                sendRes(res, json)
            });
    });

    app.get("/trajets/:villed/:villea/:dateDepart",function(req,res){

        var dateOut = req.params.dateDepart;

        console.log("Recherche des trajets de " + req.params.villed + " à " + req.params.villea + " à partir du " + req.params.dateDepart)

        var results = database.collection("trajets").find({'depart.ville': req.params.villed, 'arrivee.ville': req.params.villea, 'date': {$gte: dateOut}});

            results.toArray(function(err,documents){
                //récuperation du résultat
                var json=JSON.stringify(documents);
                //renvoi du resultat
                sendRes(res, json)
            });
    });
});

app.listen(8888);

var express = require('express');
var app=express();
var bodyParser = require('body-parser');
var cors = require("cors");
app.use(cors());
app.use(express.json())
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.json);
// app.use(express.urlencoded({extended : true}))

//creation client

var mongoClient=require("mongodb").MongoClient;
//creation var db
var url="mongodb://localhost:27017/Covoit";

var sendRes = function(res, json){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-type","application/json");
    res.end(json);
}

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  console.log("Requete recue");
  next();
});

//connection db
mongoClient.connect(url,function(err,db){
  // const database = db; // version de mongo < 3.0 only
    const database = db.db('Covoit') // accès nommé à la BD, car mongo ne reconnait plus simplement dc.collection sur les nouvelles versions


    if (err){
      throw err;
    } else{
        console.log("connected to " + url);
    }




  //requête tous les smembres
  app.get("/membres",function(req,res){
    console.log("Recupération des membres")
    database.collection("membres").find()
    // db.collection("membres").find()
      .toArray(function(err,documents){
        //récuperation du résultat
        var json=JSON.stringify(documents);
        //renvoi du resultat
        sendRes(res, json);

      });
  });


    // membre par mail
  app.get("/membres/mail/:mail",function(req,res){
    console.log("Recupération du membre avec le mail " + req.params.mail);
    database.collection("membres").find({"mail":req.params.mail})
      .toArray(function(err,documents){
        //récuperation du résultat
        var json=JSON.stringify(documents);
        //renvoi du resultat
        sendRes(res, json);

      });
  });

    //requête prenom // useless ?
    app.get("/membres/prenom/:prenom",function(req,res){
        database.collection("membres").find({"prenom":req.params.prenom})
            .toArray(function(err,documents){
                //récuperation du résultat
                var json=JSON.stringify(documents);
                //renvoi du resultat
                sendRes(res, json);
            });
    });

  //requête nom // useless ?
  app.get("/membres/nom/:nom",function(req,res){
    database.collection("membres").find({"nom":req.params.prenom})
      .toArray(function(err,documents){
        //récuperation du résultat
        var json=JSON.stringify(documents);
        sendRes(res, json)
      });
  });

  //requête authentification
  app.get('/membres/authenticate/:mail/:password',function(req,res){
    console.log('authentification par mail/mdp : ' + req.params.mail + " / " + req.params.password);
    var membre = database.collection('membres').find({'mail':req.params.mail, 'password':req.params.password});
      membre.toArray(function(err,documents){
        //récuperation du résultat
        var json=JSON.stringify(documents);
        sendRes(res, json)
      });


  });

    //Ajoute un membre
    app.put("/membres/add/:nom/:prenom/:mail",function(req,res){
      var user = {
        "nom": req.params.nom,
        "prenom": req.params.prenom,
        "mail": req.params.mail
      };

        database.collection("membres").insertOne(user, function (err, res) {
          if (err) {
            console.log('ERROR : \n' + err);
          }
          console.log('1 user inserted');
          console.log(res);
        });
        res.sendStatus(200);
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
        console.log("Recherche des trajets de " + req.params.villed + " à " + req.params.villea)
        database.collection("trajets").find({'depart.ville': req.params.villed, 'arrivee.ville': req.params.villea})
            .toArray(function(err,documents){
                //récuperation du résultat
                var json=JSON.stringify(documents);
                //renvoi du resultat
                sendRes(res, json)
            });
    });

    app.get("/trajets/:villed/:villea/:dateDepart",function(req,res){

        var dateIn = req.params.dateDepart; // ex : 2018-01-24
        var dateOut = req.params.dateDepart; // ex : 2018-01-24

        console.log("Recherche des trajets de " + req.params.villed + " à " + req.params.villea + " à partir du " + req.params.dateDepart)

        var results = database.collection("trajets").find({'depart.ville': req.params.villed, 'arrivee.ville': req.params.villea, 'date': {$gte: dateOut}});

            results.toArray(function(err,documents){
                //récuperation du résultat
                var json=JSON.stringify(documents);
                //renvoi du resultat
                sendRes(res, json)
            });
    });

    app.post('/membres', function (req, res) {

      if(!req.body){
        console.log('bad request : ' + req.body)
        return res.sendStatus(400);
      }

      var user = {
        "nom": req.body.nom,
        "prenom": req.body.prenom,
        "mail": req.body.mail,
        "password": req.body.password,
        "role" : ["membre"]
      };

      console.log("Ajout d'un membre");
      console.log(user);

      database.collection("membres").insertOne(user, function (err, documents) {
        if (err) {
          console.log('ERROR : \n' + err);
        }

        sendRes(res, JSON.stringify(documents));
      });

    });
});

app.listen(8888);
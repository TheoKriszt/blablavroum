const express = require('express');
const app=express();
// const bodyParser = require('body-parser');
const cors = require("cors");
const ObjectID = require('mongodb').ObjectID;
app.use(cors());
app.use(express.json());
// const asyncHandler = require('express-async-handler');
const async = require('async');
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.json);
// app.use(express.urlencoded({extended : true}))

//creation client

const mongoClient=require("mongodb").MongoClient;
//creation var db
const url="mongodb://localhost:27017/Covoit";

const sendRes = function(res, json){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-type","application/json");
    res.end(json);
};

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  console.log("Requete recue");
  next();
});



//connection db
mongoClient.connect(url,function(err,db){
  // const database = db; // ancienne version de express
    const database = db.db('Covoit'); // accès nommé à la BD, car express ne reconnait plus simplement db.collection sur les nouvelles versions

    if (err){
      throw err;
    } else{
        console.log("connected to " + url);
    }

  /**
   * Membres
   */

//requête tous les membres
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

  // membre par id
  app.get("/membres/:id",function(req,res){

    var oid = new ObjectID(req.params.id);
    console.log('id : ' + req.params.id);
    database.collection("membres").find( {"_id": oid} )
    // database.collection("membres").find( {"_id.$oid": req.params.id} )
      .toArray(function(err,documents){
        console.log("Recherche de membre par id : " + req.params.id);
        delete documents[0].password; // ne pas renvoyer le mdp
        console.log(documents);
        var json = JSON.stringify(documents);
        sendRes(res, json);
      });
  });

 // membre par role
  app.get("/membres/role/:role",function(req,res){

    console.log('role : ' + req.params.id);
    database.collection("membres").find({"role": req.params.role})
      .toArray(function(err,documents){
        console.log("Recherche de membre par role :");
        var json = JSON.stringify(documents);
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
//   app.get("/membres/prenom/:prenom",function(req,res){
//     database.collection("membres").find({"prenom":req.params.prenom})
//       .toArray(function(err,documents){
//         //récuperation du résultat
//         var json=JSON.stringify(documents);
//         //renvoi du resultat
//         sendRes(res, json);
//       });
//   });

//requête nom // useless ?
//   app.get("/membres/nom/:nom",function(req,res){
//     database.collection("membres").find({"nom":req.params.prenom})
//       .toArray(function(err,documents){
//         //récuperation du résultat
//         var json=JSON.stringify(documents);
//         sendRes(res, json)
//       });
//   });

//requête authentification
  app.get('/membres/authenticate/:mail/:password',function(req,res){
    console.log('authentification par mail/mdp : ' + req.params.mail + " / " + req.params.password);
    var membre = database.collection('membres').find({'mail':req.params.mail, 'password':req.params.password});
    membre.toArray(function(err,documents){
      // console.log(documents);

      if(documents && documents[0] && documents[0].password){
        delete documents[0].password; // ne pas renvoyer le mdp
      }

      console.log(documents);
      //récuperation du résultat
      var json=JSON.stringify(documents);
      sendRes(res, json)
    });


  });

//Ajoute un membre (devrait se faire en post)
//   app.put("/membres/add/:nom/:prenom/:mail",function(req,res){
//     var user = {
//       "nom": req.params.nom,
//       "prenom": req.params.prenom,
//       "mail": req.params.mail
//     };
//
//     database.collection("membres").insertOne(user, function (err, res) {
//       if (err) {
//         console.log('ERROR : \n' + err);
//       }
//       console.log('1 user inserted');
//       console.log(res);
//     });
//     res.sendStatus(200);
//   });

//Retire un membre
  app.delete("/membres/:mail/",function(req,res){
    database.collection("membres").remove({'mail':req.params.mail});
  });


  // ajoute un nouveau membre
  app.post('/membres', function (req, res) {

    if (!req.body) {
      console.log('bad request : ' + req.body);
      return res.sendStatus(400);
    }

    var user = {
      "nom": req.body.nom,
      "prenom": req.body.prenom,
      "mail": req.body.mail,
      "telephone" : req.body.telephone,
      "age" : req.body.age,
      "adresse" : req.body.adresse,
      "password": req.body.password,
      "role": ["membre"],
      "evaluations" : [],
      "vehicule_ids" : []
    };

    // "nom": "tt",
    //   "prenom" : "tt",
    //   "mail" : "tt",
    //   "telephone" : "069858447",
    //   "age":"42",
    //   "password": "tt",
    //   "adresse" : "404, Impasse du test, Montpellier",
    //   "role" : ["admin", "membre"],
    //   "evaluations": [], // {"from" : xxx, "value": 0..5}
    //   "vehicule_ids":["5a057bab0bb1f227d5cbd8eb"]


    console.log("Ajout d'un membre");
    console.log(user);

    database.collection("membres").insertOne(user, function (err, documents) {
      if (err) {
        console.log('ERROR : \n' + err);
      }

      sendRes(res, JSON.stringify(documents));
    });
  });

  // met à jour un membre
  app.post('/membres/update', function (req, res) {

    if(!req.body){
      console.log('bad request : ' + req.body);
      return res.sendStatus(400);
    }

    console.log("modif d'un membre");

    var oid = new ObjectID(req.body._id);

    req.body._id = oid;

    database.collection("membres").update(
      {"_id": oid},
      {$set : req.body},
      function (err, documents) {
        if(err) {
          console.log("Erreur : ");
          console.log(err);
        }else {
          console.log("MAJ OK : ");
          var response = {'updateStatus' : 'OK'};
          sendRes(res, JSON.stringify(response));

        }

    });
});

  /**
   * Trajets
   */

  //retourne tous les trajets
  app.get("/trajets",function(req,res){
    database.collection("trajets").find()
      .toArray(function(err,documents){
        //récuperation du résultat
        var json=JSON.stringify(documents);
        sendRes(res, json)
      });
  });

  /**
   * Complete le tableau de trajets pour ajouter les infos sur les conducteurs
   * Se fait côté Node pour limiter les échanges client/API
   */
  const completeDriverData = function (trajets, callback) {

    let drivers = []; // tableau d'OID des membres conducteurs

    for (let trajet of trajets) { // recenser les conducteurs
      let oid = new ObjectID(trajet.conducteur);
      drivers.push(oid);
    }

    // insérer les infos du conducteur dans le trajet correspondant
    database.collection("membres").find({"_id": {$in: drivers}})
      .toArray(function (err, data) {
        for (let driver of data )  {

          driver.nbEvaluations = driver.evaluations.length;

          if(driver.evaluations.length === 0) {
            driver.evaluationMoyenne = '?';
          }
          else {
            let avg = 0;
            for (let eval of driver.evaluations){
              avg += eval.value;
            }
            driver.evaluationMoyenne =(avg / driver.evaluations.length).toFixed(1);
          }

          for (let trajet of trajets){

            if(trajet.conducteur == driver._id) {
              delete driver.password;
              delete driver.role;
              trajet.driverData = driver;

              trajet.placesRestantes = trajet.nbPlace - trajet.passager.length;
              trajet.complet = trajet.placesRestantes == 0 ? 'true' : 'false';
            }
          }
        }
        callback(null, trajets); // envoyer la réponse JSON
      });

  };

  // trouve les trajets de villed à villea
  app.get("/trajets/search/:villed/:villea",function(req,res){
    console.log("Recherche des trajets de " + req.params.villed + " à " + req.params.villea);

    async.waterfall([
      function (callback) {
        //primo : extraire les trajets de villed à villea
        database.collection("trajets").find(
          {'depart.ville': {$regex : new RegExp("^" + req.params.villed.toLowerCase(), "i")},
            'arrivee.ville': new RegExp("^" + req.params.villea.toLowerCase(), "i"),
            //'prix': {$lte: req.query.prixMax}// FIXME
            },
          // {'depart.ville': req.params.villed, 'arrivee.ville': req.params.villea, 'prix': {$lte: req.query.prixMax}},
          {"sort": [[req.query.orderBy,'asc'], ['heure','asc']]}
        ).toArray(function (err, trajets) {
          console.log(trajets.length + " trajets correspondants trouvés");
          callback(null, trajets);
        });
      },
        completeDriverData, // complete les trajets avec les données sur leurs conducteurs
      function (trajets, callback) { // filtrer les conducteurs trop bas
        let trajetsCleaned = [];

        for(let trajet of trajets){ // filtrer les conducteurs avec de trop mauvaises evaluations
          if (req.query.evalMin == 0) {
            trajetsCleaned.push(trajet);
          } else if (trajet.driverData.evaluationMoyenne != '?' && trajet.driverData.evaluationMoyenne >= req.query.evalMin) {
            trajetsCleaned.push(trajet);
          }
        }
        callback(null, trajetsCleaned);
      },
      function (trajets, callback) {
        sendRes(res, JSON.stringify(trajets));
        callback(true); // fin du waterfall
      }
    ]);

  });

  // trouve les trajets de villed à villea à partir du dateDepart
  app.get("/trajets/search/:villed/:villea/:dateDepart",function(req,res){

    // var dateOut = req.params.dateDepart; // ex : 2018-01-24
    console.log("Recherche des trajets de " + req.params.villed + " à " + req.params.villea + " à partir du " + req.params.dateDepart);

    async.waterfall([
      function (callback) {
        //primo : extraire les trajets de villed à villea
        database.collection("trajets").find(
          {'depart.ville': {$regex : new RegExp("^" + req.params.villed.toLowerCase(), "i")},
            'arrivee.ville': new RegExp("^" + req.params.villea.toLowerCase(), "i"),
            'date': {$gte: req.params.dateDepart},
            'prix': {$lte: req.query.prixMax}},
          {"sort": [[req.query.orderBy,'asc'], ['heure','asc']]}
        ).toArray(function (err, trajets) {
          callback(null, trajets);
        });
      },
      completeDriverData, // complete les trajets avec les données sur leurs conducteurs
      function (trajets, callback) { // filtrer les conducteurs trop bas
        let trajetsCleaned = [];

        for(let trajet of trajets){
          if (req.query.evalMin == 0) {
            trajetsCleaned.push(trajet);
          } else if (trajet.driverData.evaluationMoyenne != '?' && trajet.driverData.evaluationMoyenne >= req.query.evalMin) {
            trajetsCleaned.push(trajet);
          }
        }
        callback(null, trajetsCleaned);
      },
      function (trajets, callback) { // complete les trajets avec les données sur leurs conducteurs
        sendRes(res, JSON.stringify(trajets));
        callback(true); // fin du waterfall
      }
    ]);
  });

  // Recherche des trajets proposés par un conducteur
  app.get("/trajets/driver/:conducteur_id",function(req,res){

    console.log("Recherche des trajets du conducteur  " + req.params.conducteur_id);

    var results = database.collection("trajets").find({'conducteur': req.params.conducteur_id});

    results.toArray(function(err,documents){
      //récuperation du résultat
      var json = JSON.stringify(documents);
      sendRes(res, json)
    });
  });

  // propose un nouveau trajet
  app.post('/trajets', function (req, res) {

    if(!req.body){
      console.log('bad request : POST sans body');
      return res.sendStatus(400);
    }

    console.log(req.body);

    var trajet = {
      "depart" : {"ville" : req.body.villeDepart, "adresse" : req.body.adresseDepart},
      "arrivee" : {"ville" : req.body.villeArrivee, "adresse" : req.body.adresseArrivee},
      "dateDepart" : req.body.dateDepart,
      "heureDepart" : req.body.heureDepart,
      "prix" : req.body.prix,
      "nbPlaces" : req.body.nbPlaces,
      "conducteur" : req.body.conducteur,
      "passagers" : []
    };

    console.log("Ajout d'un trajet " + trajet.depart.ville + ' ->' + trajet.arrivee.ville);
    console.log(trajet);

    database.collection("trajets").insertOne(trajet, function (err, documents) {
      if (err) {
        console.log('ERROR : \n' + err);
      }
      sendRes(res, JSON.stringify(documents));
    });

  });

  //soumet une reservation d'un utilisateur pour un trajet, via PUT (unused / to remove ?)
  // unused ?
  app.put("/reservation/:userID/:tripID",function(req,res){

    var reservation = {
      'userID' : req.params.userID,
      'tripID' : req.params.tripID
    };

    console.log("Ajout d'une reservation");

    database.collection("trajets").insertOne(reservation, function (err, documents) {
      if (err) {
        console.log('ERROR : \n' + err);
      }
      sendRes(res, JSON.stringify(documents));
    });

  });

  //soumet une reservation d'un utilisateur pour un trajet, via POST
  app.post('/reservation', function (req, res) {

    if(!req.body){
      console.log('bad request : POST sans body');
      return res.sendStatus(400);
    }

    var reservation = {
      'userID' : req.body.userID,
      'tripID' : req.body.tripID
    };

    console.log("Ajout d'une reservation");

    database.collection("trajets").insertOne(reservation, function (err, documents) {
      if (err) {
        console.log('ERROR : \n' + err);
      }
      sendRes(res, JSON.stringify(documents));
    });

  });

  // trajets reserves par l'user :userID
  app.get("/reservations/:userID",function(req,res){

    console.log('Recherche des trajets reserves par userID : ' + req.params.userID);
    database.collection("trajets").find( {"passager": [ req.params.userID ]} )
    // database.collection("membres").find( {"_id.$oid": req.params.id} )
      .toArray(function(err,documents){
        var json = JSON.stringify(documents);
        sendRes(res, json);
      });
  });

  // trajet par id (trip-details)
  app.get("/trajets/id/:id",function(req,res){

    console.log("Recherche du trajet id: " + req.params.id);

    var oid = new ObjectID(req.params.id);

    // database.collection("trajets").find( {"_id": oid} )
    //   .toArray(function(err,documents){
    //     console.log(documents);
    //     var json = JSON.stringify(documents);
    //     sendRes(res, json);
    //   });

    /////////////////////////////////////
    async.waterfall([
      function (callback) {
        //primo : extraire les trajets de villed à villea
        database.collection("trajets").find( {"_id": oid} )
          .toArray(function(err,trajets){
            callback(null, trajets);
          });
      },
      completeDriverData, // complete les trajets avec les données sur leurs conducteurs
      function (trajets, callback) {
        sendRes(res, JSON.stringify(trajets));
        callback(true); // fin du waterfall
      }
    ]);
  });

});

app.listen(8888);

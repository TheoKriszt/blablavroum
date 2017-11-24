#!/usr/bin/env bash
mongoimport --db Covoit --collection vehicules --file vehicules.json --jsonArray
mongoimport --db Covoit --collection membres --file membres.json --jsonArray
mongoimport --db Covoit --collection trajet --file trajets.json --jsonArray

# Dans mongo
# show dbs
# use Covoit
# show collections
# db.membres.find({'prenom':'Marin'})
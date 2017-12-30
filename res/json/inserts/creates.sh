#!/bin/sh

#./stop_angular.sh

mongoimport --db Covoit --collection vehicules --file vehicules.json --jsonArray
mongoimport --db Covoit --collection membres --file membres.json --jsonArray
mongoimport --db Covoit --collection trajets --file trajets.json --jsonArray


#killall ng
#killall node

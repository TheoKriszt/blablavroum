#!/bin/sh

service mongod restart

while ! nc -z localhost 27017; do sleep 1 ; done # wait for mongod to start

mongo Covoit --eval "db.dropDatabase()"

mongorestore dump

# Blablavroum
Master's Degree in Computer Science project consisting in mimicking a famous carpooling website using a MEAN (MongoDB, Express, Angular, NodeJS) stack.

Project generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.3.

## Demo
Hopefully, if it's maintained, you can find a demo of the app [here](http://theo.kriszt.fr:4200)

## Development server
Clone this repo via `git clone`

You can populate mongoDB with test examples provided in `res/mongo`. `restore_mongo.sh` will do it for you 
 
Go inside the cloned directory : `cd blablavroum`

Make sure node packets are installed with `npm install`

Launch Node.js server :  `node server.js` 

Run `ng serve -o` for a dev server. 
Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The built artifacts will be stored in the `dist/` directory. 
Use the `--prod` flag for a production build.

NB : check your environment settings, as in production mode, the API URL will be overwritten with your production server's URL.

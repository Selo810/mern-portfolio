//server.js
'use strict'

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//and create our instances
var app = express();
var projects = require('./routes/project');
var skills = require('./routes/skill');
var jobs = require('./routes/job');
var mails = require('./routes/mail');

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;

//db config -- REPLACE USERNAME/PASSWORD/DATABASE WITH YOUR OWN FROM MLAB!
//var mongoDB = 'mongodb://seloweb810:password@ds141514.mlab.com:41514/selo_tasklist_db';
var mongoDB = 'mongodb://localhost:27017/portfolio';

mongoose.connect(mongoDB)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent data
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//Use our router configuration when we call /api
app.use('/api', projects);
app.use('/api', skills);
app.use('/api', jobs);
app.use('/api', mails);


//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});

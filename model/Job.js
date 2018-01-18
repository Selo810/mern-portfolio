//mode/Skill.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var JobsSchema = new Schema({
  job_title: String,
  company_name: String,
  city: String,
  state: String,
  descriptions: String,
  image: String,
  start_date: String,
  end_date: String
});

//export our module to use in server.js
module.exports = mongoose.model('Job', JobsSchema);

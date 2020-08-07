const express = require("express")
const url = require("url");
const mysql = require('mysql');
const bodyParser = require("body-parser");
const moment = require('moment');
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const Server = https.createServer(_,app).listen(function() {
  console.log("server opened");
});
app.post()
// get -> retrive(select)
// post -> insert
// put -> update
// delete -> delete
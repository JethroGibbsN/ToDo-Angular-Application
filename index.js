var express = require('express');
var app = express();
var nodemon = require('nodemon')
var bodyParser = require('body-parser');
app.use(bodyParser.json())

const db = require('./app/db/db.js');

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync with { force: true }');
  });
// app.get("/index", (req, res) => {
//     res.json({status: "working", message: "Welcome"})
// })



app.listen(5000,()=>console.log('Server @ port 5000'));
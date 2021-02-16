var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser({limit: '50mb'}));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const PATH = require('path')
app.use('/static', express.static(PATH.join(__dirname )))
app.use(function(req, res, next) {
  //set headers to allow cross origin request.
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });
const db = require('./app/db/db.js');

db.sequelize.sync({ force: false , alter : true }).then(() => {
    console.log('Drop and Resync with { force: false }');
  });
require('./app/routes/tasks.route.js')(app);

app.listen(5000,()=>console.log('Server @ port 5000'));

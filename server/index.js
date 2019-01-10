var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var	adduser = require('./adduser.js');
var	initialise = require('./initialise.js');

//app.use(express.json);

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/initialise', initialise);
app.use('/adduser', adduser);

app.listen(8000);
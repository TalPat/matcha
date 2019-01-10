var express = require('express');
var router = express.Router();

var mysql = require('mysql')

var bcrypt = require('bcrypt');

var connection = mysql.createConnection({
	host		: 'localhost',
	user		: 'root',
	password	: 'password',
	database	: 'matcha_db'
});

router.post('/', function(req, res){
	if (!(req.body.username && req.body.email && req.body.gender && req.body.sexualpreference && req.body.biography && req.body.passwd && req.body.firstname && req.body.lastname))
	{
		res.status(400).send('Missing fields');
		return;
	}
	connection.connect(function(err) {
		if (err) throw err;
		console.log('Server connected');
		// console.log(req);
		console.log(req.body);
		console.log('INSERT INTO users (username,email,gender,sexualpreference,biography,passwd,firstname,lastname,profilepicture) VALUES (' + req.body.username + ',' + req.body.email + ',' + req.body.gender + ',' + req.body.sexualpreference + ',' + req.body.biography + ',' + req.body.passwd + ',' + req.body.firstname + ',' + req.body.lastname + ')');

		bcrypt.hash(req.body.passwd, 10, function(err, hash) {
			connection.query('INSERT INTO users (\
								username,\
								email,\
								gender,\
								sexualpreference,\
								biography,\
								passwd,\
								firstname,\
								lastname,\
								profilepicture\
							) VALUES (\
								"' + req.body.username + '",\
								"' + req.body.email + '",\
								"' + req.body.gender + '",\
								"' + req.body.sexualpreference + '",\
								"' + req.body.biography + '",\
								"' + hash + '",\
								"' + req.body.firstname + '",\
								"' + req.body.lastname + '",\
								"-1"\
							)', function(err, result) {
				if (err) throw err;
				console.log('User successfully added: ' + result);
			});
		});
	});
	res.send('POSTED');
});

module.exports = router;
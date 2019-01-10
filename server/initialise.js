var express = require('express');
var router = express.Router();

var mysql = require('mysql')

router.get('/', function(req, res){
	var connection = mysql.createConnection({
		host		: 'localhost',
		user		: 'root',
		password	: 'password'
	});
	connection.connect(function(err) {
		if (err) throw err;
		console.log("Server connected");
		connection.query('CREATE DATABASE IF NOT EXISTS matcha_db', function(err, result) {
			if (err) throw err;
			console.log("Database created: " + result);
		});

		connection.changeUser({database : 'matcha_db'}, function(err){
			if (err) throw err;
		});

		connection.query("CREATE TABLE IF NOT EXISTS users (\
							userid int(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
							username VARCHAR(30),\
							email VARCHAR(255) NOT NULL,\
							gender VARCHAR(100) NOT NULL,\
							sexualpreference VARCHAR(100) NOT NULL,\
							biography BLOB NOT NULL,\
							passwd VARCHAR(1000) NOT NULL,\
							firstname VARCHAR(45) NOT NULL,\
							lastname VARCHAR(45) NOT NULL,\
							profilepicture INT NOT NULL\
						)", function(err, result) {
			if (err) throw err;
			console.log("User table created: " + result);
		});

		connection.query("CREATE TABLE IF NOT EXISTS pictures (\
							pictureid int(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
							userid int(10) NOT NULL,\
							path VARCHAR(255) NOT NULL,\
							caption BLOB NOT NULL\
						)", function(err, result) {
			if (err) throw err;
			console.log("Picture table created: " + result);
		});

		connection.query("CREATE TABLE IF NOT EXISTS interests (\
							interestid int(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
							interest VARCHAR(255)\
						)", function(err, result) {
			if (err) throw err;
			console.log("interests table created: " + result);
		});

		connection.query("CREATE TABLE IF NOT EXISTS interestuser (\
							interestid int(10),\
							userid int(10)\
						)", function(err, result) {
			if (err) throw err;
			console.log("interestuser table created: " + result);
		});

		connection.query("CREATE TABLE IF NOT EXISTS views (\
							viewid int(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
							viewer int(10) NOT NULL,\
							viewee int(10) NOT NULL,\
							viewtime TIME NOT NULL\
						)", function(err, result) {
			if (err) throw err;
			console.log("views table created: " + result);
		});

		connection.query("CREATE TABLE IF NOT EXISTS likes (\
							likeid int(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
							liker int(10) NOT NULL,\
							likee int(10) NOT NULL\
						)", function(err, result) {
			if (err) throw err;
			console.log("likes table created: " + result);
		});

		connection.query("CREATE TABLE IF NOT EXISTS notifications (\
							notificationid int(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
							message BLOB NOT NULL,\
							sender int(10) NOT NULL,\
							receiver int(10) NOT NULL,\
							receiverread tinyint NOT NULL\
						)", function(err, result) {
			if (err) throw err;
			console.log("notifications table created: " + result);
		});
	});

	res.send('GET');
});

module.exports = router;
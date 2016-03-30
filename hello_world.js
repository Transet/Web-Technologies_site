﻿var http = require('http');
var express = require('express');
var app = express();
app.set('view.engine', 'ejs');
var sqlite = require('sqlite3');
var sqlite3 = sqlite.verbose();
var db = new sqlite3.Database('sqlite_database/database.sqlite');

app.get('/', function (req, res) {
    res.statusCode = 302; 
    res.setHeader("Location", "/home");
    res.end();
});

app.use('/recources', express.static('recources'));

app.get('/home', function(req, res){
	db.all('select * from homepage', function(error, data) {
		res.render('home.ejs', {
			title: 'Домашняя страница',
			data: data,
		});
	});
});

app.get('/maineCoon', function(req, res){
	db.all('select * from homepage', function(error, data) {
	  res.render('maineCoon.ejs', {
			title: 'Мей куны',
			data: data,
		});
	});
});

app.get('/british', function(req, res){
	db.all('select * from homepage', function(error, data) {
	  res.render('british.ejs', {
			title: 'Британцы',
			data: data,
		});
	});
});

app.get('/persian', function(req, res){
	db.all('select * from homepage', function(error, data) {
	  res.render('persian.ejs', {
			title: 'Персы',
			data: data,
		});
	});
});

app.get('/siamese', function(req, res){
	db.all('select * from homepage', function(error, data) {
	  res.render('siamese.ejs', {
			title: 'Сиамцы',
			data: data,
		});
	});
});

app.post('/add', function(req, res) {
	db.run("INSERT INTO homepage (name,imagepath,smalldescription,en_name) VALUES (?,?,?,?)",req.query.name, req.query.imagepath, req.query.smalldescription, req.query.en_name, function(error) {
		if(error) console.log(error);
		else {
			res.send('ok');
		}
	})
});

app.get('/getLastKey', function(req, res) {
	var execquery = 'SELECT id FROM homepage WHERE name = "'+req.query.name+'" AND imagepath = "'+req.query.imagepath+'" AND smalldescription = "'+req.query.smalldescription+'" AND en_name = "'+req.query.en_name+'" ';
	db.get(execquery, [] , 
			function(err, row) {
				if(err) console.log("error: " + err);
			else {
				res.writeHead(200, {
					'Content-Type': 'text/plain',
					'Access-Control-Allow-Origin' : '*'
				});
				res.end(JSON.stringify({ id: row.id }));
			}
	});
});

app.post('/del', function(req, res) {
	db.run("DELETE FROM homepage WHERE id="+req.query.id, function(error) {
		if(error) console.log(error);
		res.send('ok');
	})
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
var http = require('http');
var express = require('express');
var app = express();
app.set('view.engine', 'ejs');
var sqlite3 = require('sqlite3').verbose();
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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
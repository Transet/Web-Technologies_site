var http = require('http');
var express = require('express');
var app = express();
app.set('view.engine', 'ejs');

app.get('/', function (req, res) {
    res.statusCode = 302; 
    res.setHeader("Location", "/home");
    res.end();
});

app.use('/recources', express.static('recources'));

app.get('/home', function(req, res){
  res.render('home.ejs', {
        title: 'Домашняя страница',
  });
});

app.get('/maineCoon', function(req, res){
  res.render('maineCoon.ejs', {
        title: 'Мей куны',
  });
});

app.get('/persian', function(req, res){
  res.render('persian.ejs', {
        title: 'Персы',
  });
});

app.get('/british', function(req, res){
  res.render('british.ejs', {
        title: 'Британцы',
  });
});

app.get('/siamese', function(req, res){
  res.render('siamese.ejs', {
        title: 'Сиамцы',
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
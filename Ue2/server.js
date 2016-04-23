var express     = require('express');
var app         = express();
var path        = require('path');
var fs          = require('fs');
var hrstart     = process.hrtime();

var re = new RegExp("Z*");

app.get('/time', function (req, res) {
  res.set('Content-Type', 'text/plain');
  res.send(new Date().toLocaleTimeString());
});

app.use(express.static(path.join(__dirname,'static')));

app.get('/static/:name', function (req, res, next) {

  var options = {
    root: __dirname + '/static/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });

});

app.use(express.static(path.join(__dirname,'static')));

app.get('/:name', function (req, res, next) {
  var fileName = req.params.name;

  fs.readFile(fileName,'utf8', function(err, data) {
  if (err) throw err;
  var hrend = process.hrtime(hrstart);

  res.send(''+data+ '\n' + 'Execution time (hr): ' + hrend[1]/1000000 + 'ms' );
});

});

app.get(re, function(req, res) {
  res.send('Hello World!');
});


app.listen(3000, function () {
  console.log("Server running");

});

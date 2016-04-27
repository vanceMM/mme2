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

app.use('/static', express.static(__dirname + '/static'));

app.get('/:name', function (req, res, next) {
  var fileName = req.params.name;

  fs.readFile(fileName,'utf8', function(err, data) {
  if (err) {
  console.log('file was not found');
  return next();
}
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

// @author: doge
/* Loading the required modules*/

var express     = require('express');
var app         = express();
var path        = require('path');
var fs          = require('fs');
var hrstart     = process.hrtime();

/*
    use express middleware express.static
    with /static path prefix and absolute path
    add route to static files
*/
//app.use('/static', express.static(__dirname + '/static'));

/*
    use express middleware express.static
    without path prefix,
    with absolute path
    add route to static files
*/
//app.use(express.static(path.join(__dirname, '../Ue2 ')));


/*
    routing any filename input to a filereader, if the file does not exists the readFile methodes throws
    an error and goes on with the next route.
    /:name is the property available at req.params.name.
*/

app.get('/:name', function (req, res, next) {
  var fileName = req.params.name;
  var hrend = process.hrtime(hrstart);
  fs.readFile(fileName,'utf8', function(err, data) {
    if (err) {
      console.log("file was not found");
      return next();
    }
    //current high-resolution real time

    res.send(''+data+ '\n' + 'Execution time (hr): ' + hrend[1]/1000000 + 'ms' );

  });

});

app.get('/time', function (req, res) {
  //sets the Content-Type of the respond object
  res.set('Content-Type', 'text/plain');
  res.send(new Date().toLocaleTimeString());
});

/*
    use express middleware express.static
    without static path prefix and relative path
*/
app.use(express.static('../Ue2'));

/*
    match every url and respond "hello world"
*/
app.get('*', function(req, res) {
  res.send('Hello World!');
});


app.listen(3000, function () {
  console.log("Server running");

});

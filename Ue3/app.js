/** Main app for server to start a small REST API for tweets
 * The included ./blackbox/store.js gives you access to a "database" which contains
 * already tweets with id 101 and 102, as well as users with id 103 and 104.
 * On each restart the db will be reset (it is only in memory).
 * Best start with GET http://localhost:3000/tweets to see the JSON for it
 *
 * TODO: Start the server and play a little with Postman
 * TODO: Look at the Routes-section (starting line 68) and start there to add your code
 *
 * @author Johannes Konert(edited by Aryan Rezai, Benjamin Blekmann, Valentin Risch)
 * @licence CC BY-SA 4.0
 *
 */
"use strict";  // tell node.js to be more "strict" in JavaScript parsing (e.g. not allow variables without var before)

// node module imports
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var extend = require('util')._extend;

// our own modules imports
var store = require('./blackbox/store.js');

// creating the server application
var app = express();

// Middleware ************************************
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // set true!

// logging
app.use(function(req, res, next) {
    console.log('Request of type '+req.method + ' to URL ' + req.originalUrl);
    next();
});


// API-Version control. We use HTTP Header field Accept-Version instead of URL-part /v1/
app.use(function(req, res, next){
    // expect the Accept-Version header to be NOT set or being 1.0
    var versionWanted = req.get('Accept-Version');
    if (versionWanted !== undefined && versionWanted !== '1.0') {
        // 406 Accept-* header cannot be fulfilled.
        res.status(406).send('Accept-Version cannot be fulfilled').end();
    } else {
        next(); // all OK, call next handler
    }
});

// request type application/json check
app.use(function(req, res, next) {
    if (['POST', 'PUT'].indexOf(req.method) > -1 &&
        !( /application\/json/.test(req.get('Content-Type')) )) {
        // send error code 415: unsupported media type
        res.status(415).send('wrong Content-Type');  // user has SEND the wrong type
    } else if (!req.accepts('json')) {
        // send 406 that response will be application/json and request does not support it by now as answer
        // user has REQUESTED the wrong type
        res.status(406).send('response of application/json only supported, please accept this');
    }
    else {
        next(); // let this request pass through as it is OK
    }
});

// Routes ***************************************
// Tweets

app.get('/tweets', function(req,res,next) {
    var tweets_href = {};                                                             // create emtpy object
    tweets_href.href = req.protocol + '://' + req.get('host') + req.originalUrl;      // set the href attribut of the request for http://host/tweets
    tweets_href.items = extend([],store.select('tweets'));                            // clone list of tweets
    tweets_href.items.forEach(function (item) {                                       // itereate over items and add the references
        var id = item.id;
        item.comments = {};                                                           // add key "comments" to tweet object (item) with empty
        item.comments.href  = req.protocol + '://' + req.get('host') + "/tweets/" + item.id + "/comments";
        //item.comments.items = [];
        if (req.query.expand){
            item.comments.items = store.select('comment').filter(function (item) {
            //console.log(id);
            return item.tweetId == id;
        });}
    });
    //send the object as json
    res.json(tweets_href);

});

app.post('/tweets', function(req,res,next) {
    var id = store.insert('tweets', req.body);
    // set code 201 "created" and send the item back
    res.status(201).json(store.select('tweets', id));
});

app.get('/tweets/:tweetsId', function(req,res,next) {
    var id = req.params.tweetsId;
    var tweets_href = {};
    tweets_href.href = req.protocol + '://' + req.get('host') + req.originalUrl ;
    tweets_href.tweet = extend({},store.select('tweets', req.params.tweetsId));
    tweets_href.tweet.comments = {};
    tweets_href.tweet.comments.href = req.protocol + '://' + req.get('host') + req.originalUrl + "/comments";
    tweets_href.tweet.comments.items = store.select('comment').filter(function (item) {
        return item.tweetId == id;
    });

    res.json(tweets_href);

});
/*
app.delete('/tweets/:tweetsId', function(req,res,next) {
    store.remove('tweets', req.params.tweetsId);
    res.status(200).end();
});
*/

// TODO: also delete matching comments of the tweet
app.delete('/tweets/:tweetsId', function(req,res,next) {
    //var comments = {};
    //var comments = store.select('comment').filter(function (item){
      //return item.tweetId == req.params.tweetsId;
    //});
    //store.remove('comment', 106);
    //store.remove('comment', 106);
    store.remove('tweets', req.params.tweetsId);
    res.status(200).end();
});
//brauch comment id
// schleife, die comment id zum passenden tweet holt

app.put('/tweets/:tweetsId', function(req,res,next) {
    store.replace('tweets', req.params.tweetsId, req.body);
    res.status(200).end();
});


// Comments ****************

// TODO: add your routes etc.
app.get('/comments', function(req,res,next) {
    res.json(store.select('comment', req.params.id));
});

app.get('/tweets/:id/comments', function(req,res,next) {
  //regexmatch("[0-9]+",req.params.id )
  var comments_href = {};
  //comments_href.href = req.protocol + '://' + req.get('host') + req.originalUrl ;
  if(req.params.id.match("[0-9]+")){
      var comments = store.select('comment').filter(function (item){
      return item.tweetId == req.params.id;
      console.log(item.tweetId);
      console.log(req.params.id);
    });
    res.json(comments);
  }
  else
    res.status(204);
});

/*
app.post('/comments', function(req,res,next) {
    var id = store.insert('comments', req.body);
    // set code 201 "created" and send the item back
    res.status(201).json(store.select('comments', id));
});
*/
app.post('/tweets/:tweetId/comments', function(req,res,next) {
    req.body.tweetId = req.params.tweetId;
    var id = store.insert('comment', req.body);
    // set code 201 "created" and send the item back
    res.status(201).json(store.select('comment', id));
});

app.get('/tweets/:tweetId/comments/:commentId', function(req,res,next) {
    var tweetId = store.select('comment', req.params.commentId).tweetId;
    if (tweetId == req.params.tweetId){
      var id = req.params.commentId;
      var comment_href = {};
      comment_href.href = req.protocol + '://' + req.get('host') + req.originalUrl;
      comment_href.comment = extend({}, store.select('comment', req.params.commentId));
      res.json(comment_href);
      //res.json(store.select('comment', req.params.commentId));
    }
    else res.status(400).end();
});

app.delete('/tweets/:tweetId/comments/:commentId', function(req,res,next) {
    var tweetId = store.select('comment', req.params.commentId).tweetId;
    if (tweetId == req.params.tweetId){
      store.remove('comment', req.params.commentId);
      res.status(200).end();
    }
    else res.status(400).end();
});

/*
app.put('/tweets/:tweetId/comments/:commentId', function(req,res,next) {
    req.body.tweetId = req.params.tweetId;
    store.replace('comment', req.params.commentId, req.body);
    res.status(200).end();
});
*/
app.put('/tweets/:tweetId/comments/:commentId', function(req,res,next) {
  var tweetId = store.select('comment', req.params.commentId).tweetId;
  if (tweetId == req.params.tweetId){
    store.replace('comment', req.params.commentId, req.body);
    res.status(200).end();
  }
  else res.status(400).end();
});


app.patch('/tweets/:tweetId/comments/:commentId', function(req,res,next) {
    var commentPatch = store.select('comment', req.params.commentId);
    extend(commentPatch, req.body);
    res.status(200).end();
});


// CatchAll for the rest (unfound routes/resources ********

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers (express recognizes it by 4 parameters!)

// development error handler
// will print stacktrace as JSON response
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log('Internal Error: ', err.stack);
        res.status(err.status || 500);
        res.json({
            error: {
                message: err.message,
                error: err.stack
            }
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
            error: {}
        }
    });
});



// Start server ****************************
app.listen(3000, function(err) {
    if (err !== undefined) {
        console.log('Error on startup, ',err);
    }
    else {
        console.log('Listening on port 3000');
    }
});

/** This module defines the routes for videos using the store.js as db memory
 *
 * @author Johannes Konert
 * @licence CC BY-SA 4.0
 *
 * @module routes/videos
 * @type {Router}
 */

// remember: in modules you have 3 variables given by CommonJS
// 1.) require() function
// 2.) module.exports
// 3.) exports (which is module.exports)

// modules
var express = require('express');
var logger = require('debug')('me2u4:videos');
var store = require('../blackbox/store');

var videos = express.Router();

// if you like, you can use this for task 1.b:
var requiredKeys = {title: 'string', src: 'string', length: 'number'};
var optionalKeys = {description: 'string', playcount: 'number', ranking: 'number'};
var internalKeys = {id: 'number', timestamp: 'number'};


// routes **********************

/**
 simple route for get and post at '/'
 */
videos.route('/')
    .get(function(req, res, next) {
        //TODO
    })
    //inserts a video to the store.js and sends it back to the client
    .post(function(req,res,next) {
        /*forEach(req.body, function (item) {
            if(item.isNumber() & item < 0) {
                res.status(400).json({'error' :{ 'code' : 400, 'message' : 'Only postive values are allowed in attributes'}});
            }
        });*/
        if(req.body.ranking <0 ){
            res.status(400).json({'error' :{ 'code' : 400, 'message' : 'Only postive values are allowed in attributes'}});
        }
        //check if there is a timestamp, if not create one
        if(!req.body.timestamp) {
            req.body.timestamp = Date.now();
        }
        //check if there is a playcount, if not create one with default value 0
        if(!req.body.playcount) {
            req.body.playcount = 0;
        }
        //check if there is a ranking, if not create one with default value 0
        if(!req.body.ranking) {
            req.body.ranking = 0;
        }
        var video = store.insert('videos', req.body);
        res.status(201).json(store.select('videos', video));
    });

/**
 *  a route for put and delete requests
 *  @param :id the videos id
 */
videos.route('/:id')
    .put(function (req, res, next) {
       store.replace('videos', req.params.id, req.body);
       res.json(store.select('videos', req.params.id));
    })
    .delete(function (req, res, next) {
        //get the video object for the given id and check if it exists, send 400 if not
        var video = store.select('videos', req.params.id);
        if(video == undefined) {
            res.status(404).json({'error' :{ 'code' : 404, 'message' : 'item does not exist'}});
        }
        else {
            store.remove('videos', req.params.id);
            res.set('Content-Type', 'json/application');
            res.status(204).end();
        }
});
// route that catches all the others(wrong ones)
videos.route('/*')
    .all(function (req, res, next) {
        res.status(405).json({'error' :{ 'code' : 405, 'message' : 'Invalid route'}});

    });



// this middleware function can be used, if you like (or remove it)
/*videos.use(function(req, res, next){
    // if anything to send has been added to res.locals.items
    if (res.locals.items) {
        // then we send it as json and remove it
        res.json(res.locals.items);
        delete res.locals.items;
    } else {
        // otherwise we set status to no-content
        res.set('Content-Type', 'application/json');
        res.status(204).end(); // no content;
    }
});*/

module.exports = videos;

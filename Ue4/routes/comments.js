/** This module defines the routes for comments using the store.js as db memory
 *
 * @author Carlos Rezai, Benjamin Bleckmann, Valentin Risch
 * @licence CC BY-SA 4.0
 *
 * @module routes/comments
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

var comments = express.Router();

// if you like, you can use this for task 1.b:
var requiredKeys = {title: 'string', src: 'string', length: 'number'};
var optionalKeys = {description: 'string', playcount: 'number', ranking: 'number'};
var internalKeys = {id: 'number', timestamp: 'number'};


// routes **********************

comments.route('/')

    //get all comments
    .get(function(req, res, next) {
        var comments = store.select('comments');
        res.status(200).json(comments);
    })

    //inserts a video to the store.js and sends it back to the client
    .post(function(req,res,next) {
        if(
            req.body.id || //!isNaN(req.body.id) ||
            req.body.FromVideoId === undefined || isNaN(req.body.FromVideoId) ||
            req.body.text === undefined || typeof req.body.text === 'string' ||  req.body.text instanceof String ||
            isNaN(req.body.timestamp) ||
            req.body.likes <0 ||
            req.body.dislikes <0){
            res.status(400).json({'error' :{ 'code' : 400, 'message' : 'wrong values for field or fields'}});
        }
        //check if there is a timestamp, if not create one
        if(!req.body.timestamp) {
            req.body.timestamp = Date.now();
        }
        //check if there is likes, if not create with default value 0
        if(!req.body.likes) {
            req.body.likes = 0;
        }
        //check if there is dislikes, if not create with default value 0
        if(!req.body.dislikes) {
            req.body.dislikes = 0;
        }
        var video = store.insert('comments', req.body);
        res.status(201).json(store.select('comments', video));
    });

comments.route('/:id')
        .put(function (req, res, next) {
            store.replace('comments', req.params.id, req.body);
            res.json(store.select('comments', req.params.id));
        })
        .delete(function (req, res, next) {
            //get the video object for the given id and check if it exists, send 400 if not
            var comments = store.select('comments', req.params.id);
            if(comments == undefined) {
                res.status(404).json({'error' :{ 'code' : 404, 'message' : 'item does not exist'}});
            }
            else {
                store.remove('comments', req.params.id);
                res.set('Content-Type', 'json/application');
                res.status(204).end();
            }
         });
// route that catches all the others(wrong ones)
comments.route('/*')
    .all(function (req, res, next) {
        res.status(405).json({'error' :{ 'code' : 405, 'message' : 'Invalid route'}});

    });

module.exports = comments;
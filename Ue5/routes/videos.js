/** This module defines the routes for videos using a mongoose model
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
var mongoose = require('mongoose');

// own middlewares
var filterware = require('../restapi/filter-middleware');
var limitoffsetware = require('../restapi/limit_offset-middleware');


// TODO add here your require for your own model file
var VideoModel =  require('./../models/video');


var videos = express.Router();



// {"title" :"dope", "description" : "i like it", "src" : "dingdongding.com", "length" : "8712831", "playcount" : "9123", "ranking" : "89"}
// title : 'dope', description : 'i like it', src : 'dingdongding.com', length : '8712831', playcount : '9123', ranking : '89'




// routes **********************
// for videos
videos.route('/')
    .get(function(req, res, next) {
        
        VideoModel.find({}, function(err, items){
            if (!err) {
                res.status(200).json(items);
            }
            next(err);
        });
    })
    .post(function(req,res,next) {
        var newVideo = new VideoModel(req.body);
        newVideo.save(function (err) {
            if (!err) {
                res.status(201).json(newVideo);
            }
            next(err);
        });
    });

// for video/:id
videos.route('/:videoId')
    .get(function(req, res, next){
       VideoModel.findById(req.params.videoId, function (err, video) {
           if (!err) {
               res.status(200).json(video);
           }
           next(err);
       })
    })



    .put(function (req, res, next) {

        //var modelid = VideoModel.schema.paths._id;
        //console.log("this should be id:" + modelid);

            VideoModel.findByIdAndUpdate(req.params.videoId, req.body, {new: true}, function (err, video) {
                if (!err) {
                    res.status(200).json(video);
                }
                next(err);
            })
    })



    .patch(function (req, res, next) {
            VideoModel.findByIdAndUpdate(req.params.videoId, req.body, {new: true}, function (err, video) {
                if (!err) {
                    res.status(200).json(video);
                }
                next(err);
            })
    })



    .delete(function (req, res, next) {
    VideoModel.findByIdAndRemove(req.params.videoId, function (err, video) {
        if (!err) {
            res.status(200).json(video)
        }
        next(err);
    })
});

videos.use(filterware);
videos.use(limitoffsetware);

// this middleware function can be used, if you like or remove it
/*
videos.use(function(req, res, next){
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
});
*/

module.exports = videos;


// video post test stuff
// var newVideo = new VideoModel({
//     title:          req.body.title,
//     description:    req.body.description,
//     src:            req.body.src,
//     length:         req.body.length,
//     playcount:      req.body.playcount,
//     ranking:        req.body.ranking
// });
// newVideo.save(function (err, newVideo) {
//     if (!err) {
//         console.log("should add video");
//         res.status(201).json(newVideo);
//     }
//     next();
// });


// last working stand

// // for video/:id
// videos.route('/:videoId')
//     .get(function(req, res, next){
//        VideoModel.findById(req.params.videoId, function (err, video) {
//            if (!err) {
//                res.status(200).json(video);
//            }
//            next(err);
//        })
//     })
//
//
//
//     // .put(function (req, res, next) {
//     //
//     //     //var modelid = VideoModel.schema.paths._id;
//     //     //console.log("this should be id:" + modelid);
//     //
//     //     VideoModel.findByIdAndUpdate(req.params.videoId, req.body, {new: true}, function (err, video) {
//     //         if (!err) {
//     //             res.status(200).json(video);
//     //         }
//     //         next(err);
//     //     })
//     // })
//
//
//
//     .patch(function (req, res, next) {
//         VideoModel.findByIdAndUpdate(req.params.videoId, req.body, {new: true}, function (err, video) {
//             if (!err) {
//                 res.status(200).json(video);
//             }
//             next(err);
//         })
//     })
//
//
//
//     .delete(function (req, res, next) {
//     VideoModel.findByIdAndRemove(req.params.videoId, function (err, video) {
//         if (!err) {
//             res.status(200).json(video)
//         }
//         next(err);
//     })
// });
/** This module defines a express.Router() instance
 * -  allows browsing through the result
 * -
 *
 * @author Carlos Rezai, Benjamin Bleckmann, Valentin Risch
 *
 * @module restapi/limit
 * @type {Router}
 */

var limit = require('express').Router();
var store = require('../blackbox/store');

/**
 * route for limiting the video results
 */
limit.route('/')
    .get(function (req, res, next) {
        var videos = store.select('videos');                            // get a all videos
        var offset = req.query.offset ;
        var limit = req.query.limit ;
        if(offset === undefined) {
            offset = 0;
        }
        else if(offset >= videos.length) {
            res.status(400).json();
        }
        else if(offset < 0) {
            res.status(400).json();
        }
        if(limit === undefined || limit >= videos.length) {
            limit = videos.length;
        }
        else if((isNaN(limit) || isNaN(offset)) || (isNaN(limit) && (isNaN(offset)))) {
         res.status(400).json();
         }
        else if(limit<0 || offset<0) {
            res.status(400).json();
        }
        else if(limit == 0) {
            res.status(400).json();
        }
        if(offset == 0 && limit == 0) {
            res.status(200).json(videos);
        } else {
            var limitVideos = [];
            for (var i = offset; i<limit; i++) {
                var obj = videos[i];
                //console.log(obj);
                limitVideos.push(obj);
            }
            res.status(200).json(limitVideos);
        }

    });

module.exports = limit;
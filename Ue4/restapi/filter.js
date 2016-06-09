/** This module defines a express.Router() instance
 * - filters every GET request with filter parameter
 * - returns only the attributes defined in filter
 *
 * @author Carlos Rezai, Benjamin Bleckmann, Valentin Risch
 *
 * @module restapi/filter
 * @type {Router}
 */

var filter = require('express').Router();
var store = require('../blackbox/store');
/**
 *  helper function for
 * @param objectKeys array of values that should be subset of objectKeys
 * @param filterKeys array of values
 */
function validateQuery(objectKeys, filterKeys) {
    var boolean = true;
        filterKeys.forEach(function (item) {
            if(objectKeys.indexOf(item)<0) {            // if key(item) doesnt match, index is -1, so its false
                boolean = false;
            }
        });
    return boolean;
}

/**
 * route for videos with id to be filtered
 */
filter.route('/:id')

    .get(function (req, res, next) {
    if(req.query.filter) {
        var filterKeys = req.query.filter.split(',');                         // array for key values from the query object
        var video = store.select('videos', req.params.id);              // get a video item form the store
        var video_keys = Object.keys(video);                            // get the filterKeys of the video object
        if(video && validateQuery(video_keys, filterKeys)) {                   // validate if the query filterKeys are subset of video filterKeys
            var obj = {};                                               // create object and set propertys
               filterKeys.forEach(function (key) {
                   if(video.hasOwnProperty(key)) {                      // check if video contains passed property
                       obj[key] = video[key];
                   }
               });
            res.status(200).json(obj);                                  // send the new created object with custom propertys
        } else {
            res.status(400).json();                                     // set status 400 if filterKeys don't match
        }
    }
});



/**
 * route for videos with id to be filtered
 */
/*
filter.route('/:id')

    .get(function (req, res, next) {
        if(req.query.filter) {
            var filterKeys = req.query.filter.split(',');                         // array for key values from the query object
            var video = store.select('videos', req.params.id);              // get a video item form the store
            var video_keys = Object.keys(video);                            // get the filterKeys of the video object
            if(video && validateQuery(video_keys, filterKeys)) {                   // validate if the query filterKeys are subset of video filterKeys
                var obj = JSON.parse(JSON.stringify(video));                                              // create object and set propertys
                console.log(obj);
                filterKeys.forEach(function (key) {
                    if(!video.hasOwnProperty(key)) {                      //
                        //obj[key] = video[key];
                        delete obj[key];
                    }
                });
                res.status(200).json(obj);                                  // send the new created object with custom propertys
            } else {
                res.status(400).json();                                     // set status 400 if filterKeys don't match
            }
        }
    });
*/

module.exports = filter;
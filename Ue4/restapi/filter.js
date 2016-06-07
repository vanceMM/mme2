/** This module defines a express.Router() instance
 * - filters every GET request with filter parameter
 * - returns only the attributes defined in filter
 *
 * @author Carlos Rezai, Benjamin Bleckmann, Valentin Risch
 *
 * @module restapi/filter
 * @type ?
 */

var filter = require('express').Router();
var store = require('../blackbox/store');
/**
 *  helper function for
 * @param arr1 array of values that should be subset of arr1
 * @param arr2 array o values
 */
function validateQuery(arr1, arr2) {
    var boolean = true;
        arr2.forEach(function (item2) {
            if(arr1.indexOf(item2)<0) {
                console.log('should return false');
                boolean = false;
            }
        });
}

/**
 * route for videos with id to be filtered
 */
filter.route('/:id')

    .get(function (req, res, next) {
    if(req.query.filter) {
        var keys = req.query.filter.split(',');                         // array for key values from the query object
        var video = store.select('videos', req.params.id);              // get a video item form the store
        var video_keys = Object.keys(video);                            // get the keys of the video object
        if(video & validateQuery(video_keys, keys)) {                   // validate if the query keys are subset of video keys
            var obj = {};                                               // create object and set propertys
               keys.forEach(function (key) {
                   if(video.hasOwnProperty(key)) {
                       obj[key] = video[key];
                   }
               });
            res.status(200).json(obj);                                  // send the new created object with custom propertys
        } else {
            res.status(400).json();                                     // set status 400 if keys don't match
        }
    }
});



module.exports = filter;
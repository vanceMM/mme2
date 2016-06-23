/**
 * Created by baetschjunge on 21/06/16.
 */


var router = require('express').Router();
var logger = require('debug')('me2u4:filterware');

var VideoModel =  require('./../models/video');



router.use(function (req, res, next) {
    eval('var offset='+ '{"skip": +req.query.offset}' );
    var limit = req.query.limit;
    var items = res.locals.items;

    if(offset) {
        VideoModel.find({}, null, offset, function (err, videos) {
            if (!err) {
                items = videos;
                if(limit) {
                    items.splice(limit);
                }
                res.locals.items = items;
                next();
            }

        });
    }


});

module.exports = router;

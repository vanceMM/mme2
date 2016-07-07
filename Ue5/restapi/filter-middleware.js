/**
 * Created by baetschjunge on 21/06/16.
 */



var router = require('express').Router();
var logger = require('debug')('me2u4:filterware');
var VideoModel =  require('./../models/video');


router.use(function (req, res, next) {
    var filterString = req.query.filter;
    var filterKeys = [];
    var err = null;

    if (filterString !== undefined) {
        filterKeys = filterString.split(',');
        filterKeys.forEach(function (item, index, array) {
            array[index] = item.trim();
        });
        var projection = {};
        filterKeys.forEach(function (item) {
           projection[item] = 1
        });
        projection._id = 0;     // tell mongoose to exclude id
        VideoModel.find({},projection,function(err, videos){
            if (!err) {
                res.status(200).json(videos);
            }
            next(err);
        });

    }
    next();

});

module.exports = router;
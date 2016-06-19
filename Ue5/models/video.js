/** This module defines the VideoSchema for videos using the mongodb as db
 *
 * @author Doge
 * @edited by Carlos Rezai, Benjamin Bleckmann, Valentin Risch
 * @licence CC BY-SA 4.0
 *
 * @module models/video
 * @type {Schema}
 */

// remember: in modules you have 3 variables given by CommonJS
// 1.) require() function
// 2.) module.exports
// 3.) exports (which is module.exports)
    

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var VideoSchema     = new Schema({
//    _id:            {type: Schema.Types.ObjectId},
    title:          {type: String, required: true},
    description:    {type: String, default: ""},
    src:            {type: String, required: true},
    length:         {type: Number, required: true, min: 0},
    playcount:      {type: Number, default: 0, min: 0},
    ranking:        {type: Number, default: 0, min: 0}
    },{
     timestamps:     {createdAt: 'timestamp'}
});

module.exports = mongoose.model('Video', VideoSchema);
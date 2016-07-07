/**
 * Created by valentin on 02/07/16.
 */

define(['backbone', 'underscore'],
    function (Backbone, _) {
        var result = {};
        var videoSchema = {
            idAttribute: '_id',
            urlRoot: '/videos',
            defaults : {
                description : '',
                playcount: 0,
                ranking: 0
            },
            initialize: function() {
                // after constructor code
            },
            validate: function(attr) {
                if ( _.isEmpty(attr.title) ) {
                    return "Missing Title";
                }
                if ( _.isEmpty(attr.src) ){
                    return "Missing src";
                }

            }
        };

        

        var VideoModel = Backbone.Model.extend(videoSchema);

        var VideoCollection = Backbone.Collection.extend({
            model: VideoModel,
            url: '/videos',
            initialze : function () {
                this.on('add', function(video) {
                    if (video.isValid() && video.isNew()) {
                        video.save();
                    }
                })
            }
        });

        result.Model = VideoModel;
        result.Collection = VideoCollection;
        return result;

});
/**
 * Created by valentin on 02/07/16.
 */

define(['backbone', 'underscore'],
    function (Backbone, _) {
        var Video = {};
        var videoSchema = {
            idAttribute: '_id',
            urlRoot: '/videos',
            title : 'title',
            source : 'src',
            length: 'length',
            defaults : {
                description : '',
                playcount: 0,
                ranking: 0,
                timestamp: ''
            },
            initialize: function() {
                // after constructor code
            },
            validate: function(attr) {
                if ( _.isEmpty(attr.title) ) {
                    return "Missing Title";
                }
                if (_.isEmpty(attr.source)) {
                    return "Missing Source";
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

        Video.Model = VideoModel;
        Video.Collection = VideoCollection;
        return Video;

});
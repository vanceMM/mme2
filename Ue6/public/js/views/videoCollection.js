/**
 * Created by valentin on 06/07/16.
 */

define(['backbone', 'jquery', 'underscore', 'views/video'],
    function (Backbone, $, _, VideoView) {

        var VideoCollectionView = Backbone.View.extend({
            el: '#video-list',
            template: undefined,
            render: function () {
                this.$el.empty();
                this.collection.each(function (video) {
                    var videoView = new VideoView({model: video});
                    this.$el.prepend(videoView.render().el);
                }, this);
            },
            initialize: function () {
                this.listenTo(this.collection, 'add', this.render);
            }
        });
        return VideoCollectionView;
    });
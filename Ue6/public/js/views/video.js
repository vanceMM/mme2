/**
 * Created by valentin on 06/07/16.
 */

define(['backbone', 'jquery', 'underscore'],
    function (Backbone, $, _) {

        var VideoView = Backbone.View.extend({
            tagName: 'li',
            className: 'video',
            template: _.template($('#video-template').text()),
            render: function () {
                this.$el.html(this.template(this.model.attributes));
                return this;
            }, 
            initialize: function () {
                this.listenTo(this.model, 'change', this.render);
            }
        });
        return VideoView;
});
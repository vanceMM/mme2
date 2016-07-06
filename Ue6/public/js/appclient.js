/** Main application file to start the client side single page app for tweets
 *
 * @author Johannes Konert
 */

requirejs.config({
    baseUrl: "/js",
    paths: {
        jquery: './_lib/jquery-1.11.3',
        underscore: './_lib/underscore-1.8.3',
        backbone: './_lib/backbone-1.2.3'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

// AMD conform require as provided by require.js
require(['jquery','backbone', 'models/video', 'views/video'],
        function($, Backbone, Video , VideoView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'main',
            '*whatever': 'main'
        },
        main: function(){


            $('body').prepend('<h1>VLOG.ME</h1>');

            var videoCollection = new Video.Collection();
            

            videoCollection.fetch({

                success: function() {
                    console.log("data was fetched");
                    console.log(videoCollection);
                    console.log(videoCollection.length);
                    var videoView = new VideoView({model: videoCollection.at(0)});
                    $('.content').append(videoView.render().el);

                },
                error: function() {
                    console.log("something went wrong");
                }
            });
            /*console.log(videoCollection.models[0]);
            var videoView = new VideoView(videoCollection.models[0]);*/
        }
    });

    var myRouter = new AppRouter();

    // finally start tracking URLs to make it a SinglePageApp (not really needed at the moment)
    Backbone.history.start({pushState: true}); // use new fancy URL Route mapping without #
});

/**
 * Created by doge on 06/07/16.
 */

define(['backbone', 'jquery', 'underscore'],
    function (Backbone, $, _) {

        var VideoView = Backbone.View.extend({
            tagName: 'li',
            className: 'video',
            template: _.template($('#video-template').text()),
            events: {
                "click .videoBtn" : "playVideo"
            },
            playVideo: function() {

                //$(function() {
                    //var video = $('video');
                    var videos = $('body').find("video");
                    //video.get(0).play();
                    for (var i = 0; i < videos.length; i++) {
                        var video = videos[i];

                        var controls = video.nextElementSibling;
                        if (!controls || controls.className !== "controls") {
                            continue; // just in case the HTML structure has changed
                        }

                        var buttons = controls.children;
                        if (!buttons || buttons.length === 0) {
                            continue; // just in case the HTML structure has changed and buttons are missing
                        }

                        (function () {
                            var myVideo = video;
                            // for readability we assign variable names to buttons
                            var playButton = buttons[0];
                            var pauseButton = buttons[1];
                            var stopButton = buttons[2];

                            playButton.addEventListener("click", function () {
                                myVideo.play();
                            });

                            pauseButton.addEventListener("click", function () {
                                myVideo.pause();
                            });

                            stopButton.addEventListener("click", function () {
                                pauseButton.click();
                                myVideo.currentTime = 0;
                            });

                        })();
                    }
               // })




            },
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


// console.log("yeee");
// var btnListe = document.getElementsByClassName("playBtn");
// var videoListe = document.getElementsByClassName("video");
//
// console.log(btnListe);
// console.log(videoListe);
//
// var videoCount = videoListe.length;
//
// //setting an eventlistener for each button iteratively
// for (var i = 0; i < videoCount; i++) {
//     //var vidEl = document.getElementsByClassName("video");
//
//     /*setting the ids for video and button elements, so each can be returned
//      individually in the closure for the eventlistener */
//     videoListe[i].id = ["video" + i];
//
//     console.log(btnListe[0]);
//     btnListe[0].id = ["playBtn" + 0];
//
//     btnListe[0].addEventListener("click", function () {
//
//         var clickedBtn = this.id;
//
//         /*Returning the index for the pushed button by substracting the string.
//          This index is used later for getting the actual video element.*/
//
//         //var btnIndex = clickedBtn.substr(clickedBtn.length - 1);
//         var btnIndex = clickedBtn.substr(7);
//         //console.log(btnIndex);
//         console.log("index")
//         console.log(btnIndex);
//         var video2play = document.getElementById("video" + btnIndex);
//         //console.log(video2play);
//         var btnEl = document.getElementById(clickedBtn);
//
//         if (video2play.paused) {
//             video2play.play();
//
//             btnEl.innerHTML = "Pause";
//         }
//         else {
//             video2play.pause();
//             btnEl.innerHTML = "Play";
//         }
//     });
// }



//
// var videos = document.getElementsByTagName("video");
// // videos is not an array but a NodeList, thus for each does not work
// for (var i = 0; i < videos.length; i++) {
//     var video = videos[i];
//     // find the elements after the video for controls play, pause, stop
//     var controls = video.nextElementSibling;
//     if (!controls || controls.className !== "controls") {
//         continue; // just in case the HTML structure has changed
//     }
//     var buttons = controls.children;
//     if (!buttons || buttons.length === 0) {
//         continue; // just in case the HTML structure has changed and buttons are missing
//     }
//
//     // for closure context we have to save the current video in an own variable!
//     // (in an own function context! and run this anonymous function directly)
//     // try out what happens if you use "video" directly instead of myVideo below
//     (function () {
//         var myVideo = video;
//         // for readability we assign variable names to buttons
//         var playButton = buttons[0];
//         var pauseButton = buttons[1];
//         var stopButton = buttons[2];
//         playButton.addEventListener("click", function (event) {
//             if (myVideo.paused) {
//                 myVideo.play();
//                 this.style.display = "none";
//                 pauseButton.style.display = "";
//             }
//         });
//         pauseButton.addEventListener("click", function (event) {
//             if (!myVideo.paused) {
//                 myVideo.pause();
//                 this.style.display = "none";
//                 playButton.style.display = "";
//             }
//         });
//         stopButton.addEventListener("click", function (event) {
//             pauseButton.click(); // use the functionality of pause above.
//             myVideo.currentTime = 0;
//         });
//         // now hide the button that is not used at the moment
//         var buttonToHide = myVideo.paused?pauseButton:playButton;
//         buttonToHide.style.display = "none";
//     })();
// }
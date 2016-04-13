
document.addEventListener("DOMContentLoaded", domLoaded(), false);

function domLoaded(e) {
    showMenu();
    playVideoOnClick();
    stopVideoOnCLick();
    showHideVideos();
};

function playVideoOnClick(){
    var btnListe = document.getElementsByClassName("playBtn");
    var videoListe = document.getElementsByClassName("video");

    var videoCount = videoListe.length;
    // loop through button array

    for (var i = 0; i < videoCount; i++){
      var vidEl = document.getElementsByClassName("video");

      vidEl[i].id = ["video"+i];
      //console.log(el[i]);

      btnListe[i].id = ["playBtn"+i];
      //console.log(buttons[i]);

      btnListe[i].addEventListener("click", function(){
       
        var clickedBtn = this.id;
        //console.log(clickedBtn);        
        var btnIndex = clickedBtn.substr(clickedBtn.length - 1);
        //console.log(btnIndex);
        var video2play = document.getElementById("video"+btnIndex);
        //console.log(video2play);
        var btnEl = document.getElementById(clickedBtn);

        if (video2play.paused){
          video2play.play();

          btnEl.innerHTML = "Pause";
        }
        else {
          video2play.pause();
          btnEl.innerHTML = "Play";
        }
      }); // end of eventhandler

      // yolo video click listener
      videoListe[i].addEventListener("click", function(){
       
        var clickedVid = this.id;
        //console.log(clickedBtn);        
        var vidIndex = clickedVid.substr(clickedVid.length - 1);
        //console.log(btnIndex);
        var video2play = document.getElementById("video"+vidIndex);
        //console.log(video2play);
        var vidEl = document.getElementById(clickedVid);

        if (video2play.paused){
          video2play.play();
        }
        else {
          video2play.pause();
        }
      }); // end of eventhandler       
    } // end of for
}

function stopVideoOnCLick(){
  var btnListe = document.getElementsByClassName("stopBtn");
  var videoListe = document.getElementsByClassName("video");

  var videoCount = videoListe.length;
  // loop through button array

  for (var i = 0; i < videoCount; i++){
    var vidEl = document.getElementsByClassName("video");

    vidEl[i].id = ["video"+i];
    //console.log(el[i]);

    btnListe[i].id = ["stopBtn"+i];
    //console.log(buttons[i]);

    btnListe[i].addEventListener("click", function(){
     
      var clickedBtn = this.id;
      //console.log(clickedBtn);        
      var btnIndex = clickedBtn.substr(clickedBtn.length - 1);
      //console.log(btnIndex);
      var video2play = document.getElementById("video"+btnIndex);
      //console.log(video2play);
      var btnEl = document.getElementById(clickedBtn);

      video2play.pause();
      video2play.currentTime = 0;
    }); // end of eventhandler      
  } // end of for
}

function showMenu(){
  var bodyEl = document.querySelector("body");
  var navToggleBtn = document.getElementById("navBtn");

  navToggleBtn.addEventListener("click", function(){
    bodyEl.classList.toggle('active-nav');
    //e.preventDefault();
  });
}

function showHideVideos(){
    var nav = document.querySelector("nav");
    console.log(nav);
    var navItems = nav.querySelectorAll("li");
    console.log(navItems);
}
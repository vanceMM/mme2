document.addEventListener("DOMContentLoaded", domLoaded(), false);

function domLoaded(e){

    var btnListe = document.getElementsByClassName("playBtn");
    var videoListe = document.getElementsByClassName("video");

    var videoCount = videoListe.length;
    // loop through button array

    for (var i = 0; i < videoCount; i++){
      var vidEl = document.getElementsByClassName("video");

      vidEl[i].id = ["video"+i];
      //console.log(el[i]);

      btnListe[i].id = ["btn"+i];
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
    } // end of for
};

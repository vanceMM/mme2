
/*
window.addEventListener("load", start, false);

function start() {
  var container = document.getElementById('video-container');

  container.addEventListener("click", function alert(e) {

    if (e.target !== e.currentTarget) {
        var clickedItem = e.target.id;
        alert("Hello " + clickedItem);
    }
  });
}
*/


window.onload = function(){

  var buttons = document.getElementsByClassName("playBtn");
  var buttonsCount = buttons.length;
  for (var i = 0; i <= buttonsCount; i += 1){
    buttons[i].onclick = function(e){
      alert(this.id);
    };
  }


}

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

const urlString = window.location.href;
const url = new URL(urlString);

var input;
var title;
var start;

function setup() {
  title = createElement("h1","Let's draw together!");
  input = createInput("").attribute("placeholder", "type your nickname");
  start = createButton("Let's start!");

  start.mouseClicked(goToRoom);
}

function draw() {
}

function goToRoom(){
  if(input.value() != ""){
    window.open(url.origin + "/room.html?currentUser=" + input.value(), "_self");
  }
}

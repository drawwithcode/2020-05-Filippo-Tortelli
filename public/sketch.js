let socket = io(); //nello sketch abbiamo caricato socket.io, e prima nell'index
let myColor = "white";

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);

function newConnection() {
  console.log("your id: "+ socket.id)
}

function drawOtherMouse(data) {
  push();
  fill(data.color);
  ellipse(data.x,data.y,10);
  pop();
}

function setColor(assignedColor) {
  myColor = assignedColor;
}

function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background("purple");
}

function draw() {
  // put drawing code here
}

function mouseMoved() {
  push();
  fill(myColor);
  ellipse(mouseX,mouseY,20);
  pop();
  //il messaggio da mandare a server.js
  let message = {
    x: mouseX,
    y: mouseY,
    color: myColor,
  }
  //mandare il messaggio
  socket.emit("mouse", message);
}

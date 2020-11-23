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
  stroke(data.color);
  strokeWeight(10);
  line(data.x,data.y,data.pX,data.pY);
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
  background("white");
}

function draw() {
  push();
  fill("black");
  ellipse(width/2,height/2,100);
  pop();
}

function refreshSketch() {

}

function mouseDragged() {
  push();
  stroke(myColor);
  strokeWeight(20);
  line(mouseX,mouseY,pmouseX,pmouseY);
  pop();
  //il messaggio da mandare a server.js
  let message = {
    x: mouseX,
    y: mouseY,
    pX: pmouseX,
    pY: pmouseY,
    color: myColor,
  }
  //mandare il messaggio
  socket.emit("mouse", message);
}

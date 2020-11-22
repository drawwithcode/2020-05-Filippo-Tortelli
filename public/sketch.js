let socket = io(); //nello sketch abbiamo caricato socket.io, e prima nell'index

socket.on("connect", newConnection);

function newConnection() {
  console.log("your id: "+ socket.id)
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
  ellipse(mouseX,mouseY,20);
  //il messaggio da mandare a server.js
  let message = {
    x: mouseX,
    y: mouseY,
  }
  //mandare il messaggio
  socket.emit("mouse", message);
}

let socket = io(); //nello sketch abbiamo caricato socket.io, e prima nell'index
let myColor = "white";
let myPersonalUsers = [];

//parte per username
const urlString = window.location.href;
const url = new URL(urlString);
let userParameter = url.searchParams.get("currentUser");

socket.on("connect", newConnection);
socket.on("color", setColor);
socket.on("mouseBroadcast", drawOtherMouse); //al messaggio dal server risponde lo sketch
socket.on("userBroadcast", addUser);


function newConnection() {
  console.log("your id: "+ socket.id);
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

function addUser(data) {
  myPersonalUsers.push(data);
  //data è fatta da due elementi: name e color.
}


function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background("white");

  //mando il nome e il colore, per stamparlo su tutti gli sketch dei clienti
  let message = {
    name: userParameter,
    color: myColor,
  }
  socket.emit("username", message);
}

function draw() {

  let username = userParameter + " (you)";
  push();
  fill("gray");
  rect(75,75,500,height-200,20,20,20,20);
  pop();


  push();
  fill(myColor);
  rect(100,50,60,20);
  fill(myColor);
  textAlign(RIGHT,TOP);
  textSize(10);
  text(myColor,90,55);
  pop();

  push();
  fill("black");
  textAlign(LEFT,TOP);
  textSize(20);
  text(username,170,50);
  pop();

  //draw users names
  for(let i = 0; i < myPersonalUsers.length; i++) {
    push();
    fill(myPersonalUsers[i].color);
    rect(100,100+(i*30),60,20);
    fill("black");
    textAlign(RIGHT,TOP);
    textSize(10);
    text(myPersonalUsers[i].color,90,105+(i*30));
    pop();

    push();
    fill("black");
    textAlign(LEFT,TOP);
    textSize(20);
    text(myPersonalUsers[i].name,170,100+(i*30));
    pop();
}

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

  //if(condizione) rimandare emit username
}

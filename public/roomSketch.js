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
  if(data.color == "black") {
    strokeWeight(40);
  } else {
    strokeWeight(15);
  }
  line(data.x,data.y,data.pX,data.pY);
  pop();
}

function setColor(assignedColor) {
  myColor = assignedColor;

  let message = {
    name: userParameter,
    color: myColor,
  }
  socket.emit("username", message);
}

function addUser(data) {
  myPersonalUsers.push(data);
}


function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background("black");

  //mando il nome e il colore, per stamparlo su tutti gli sketch dei clienti
}

function draw() {

  //utente attuale //rettangolo di lettura
  let username = userParameter + " (you)";
  push();
  textFont("Roboto Mono");
  fill("black");
  stroke(100,100,100);
  strokeWeight(3);

  let rectHeight;
  if(myPersonalUsers.length==0) {
    rectHeight = 70;
  }
  else {
    rectHeight = 90 + (myPersonalUsers.length*30);
  }

  rect(25,25,500,rectHeight,20,20,20,20);
  pop();

  push();
  textFont("Roboto Mono");
  fill(myColor);
  rect(100,50,60,20);
  fill(myColor);
  textAlign(RIGHT,TOP);
  textSize(10);
  text(myColor,90,55);
  pop();

  push();
  textFont("Roboto Mono");
  fill("white");
  textAlign(LEFT,TOP);
  textSize(20);
  text(username,170,50);
  text("Drag to draw!", 550, 50);
  text("Press C and drag to use the rubber", 550, 80);
  pop();

  //draw the other usernames
  for(let i = 0; i < myPersonalUsers.length; i++) {
    push();
    textFont("Roboto Mono");
    fill(myPersonalUsers[i].color);
    rect(100,100+(i*30),60,20);
    textAlign(RIGHT,TOP);
    textSize(10);
    text(myPersonalUsers[i].color,90,105+(i*30));
    pop();

    push();
    textFont("Roboto Mono");
    fill("white");
    textAlign(LEFT,TOP);
    textSize(20);
    text(myPersonalUsers[i].name,170,100+(i*30));
    pop();
}

}

function cleanSketch() {
  //press C to use the gomma
  //cerchio nero grande con stroke grigia al mouseX e y
  //cerchio ancora più grande senza stroke al pmouseX e Y
}

function mouseDragged() {
  let currentColor = myColor; //per cancellare e disegnare

  push();

  if(keyIsDown(67)) {
    strokeWeight(40);
    currentColor = "black";
  }
  else{
    strokeWeight(15);

    currentColor = myColor;
  }
  stroke(currentColor);
  line(mouseX,mouseY,pmouseX,pmouseY);
  pop();
  //il messaggio da mandare a server.js
  let message = {
    x: mouseX,
    y: mouseY,
    pX: pmouseX,
    pY: pmouseY,
    color: currentColor,
  }
  //mandare il messaggio
  socket.emit("mouse", message);
}

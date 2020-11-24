console.log("node is running");

let express = require("express");

let socket = require("socket.io");

let app = express();

let port = 3000; //port for our project (metti 3mila che va bene)

let server = app.listen(port);

app.use(express.static("public"));

let io = socket(server);

io.on("connection", newConnection);

let idNumber = 0;
let colorSelection = ["#EF9CDA","#1098F7","#FFE347","#F96900","#745296"];

//funzione chiave
function newConnection(socket) {
  console.log("new connection: " + socket.client.id);

  //colore al cliente, collegato con un id da i a i+=
  let clientColor = colorSelection[idNumber%colorSelection.length];
  socket.emit("color", clientColor);
  idNumber +=1;

  socket.on("mouse", mouseMessage);
  socket.on("username", usernameMessage);

  function mouseMessage(receivedData) {
    console.log(socket.client.id, receivedData);
    socket.broadcast.emit("mouseBroadcast", receivedData);
  }

  function usernameMessage(receivedData) {
    console.log(socket.client.id, receivedData);
    socket.broadcast.emit("userBroadcast", receivedData);
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for(var i=0; i<6; i++) {
    color += letters[Math.floor(Math.random()*16)];
  }
  return color;
}

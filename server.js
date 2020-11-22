console.log("node is running");

let express = require("express");

let socket = require("socket.io");

let app = express();

let port = 3000; //port for our project (metti 3mila che va bene)

let server = app.listen(port);

app.use(express.static("public"));

let io = socket(server);

io.on("connection", newConnection);

//funzione chiave
function newConnection(socket) {
  console.log("new connection: " + socket.client.id);

  let clientColor = getRandomColor();
  socket.emit("color", clientColor);

  socket.on("mouse", mouseMessage);

  function mouseMessage(receivedData) {
    console.log(socket.client.id, receivedData);
    socket.broadcast.emit("mouseBroadcast", receivedData);
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

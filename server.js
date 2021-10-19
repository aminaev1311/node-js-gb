const http = require("http");
const io = require("socket.io");
const path = require("path");
const fs = require("fs");

let counter = 0;

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    const filePath = path.join(__dirname, "index.html");
    const rs = fs.createReadStream(filePath);
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    rs.pipe(res);
  }
});

const socket = io(server);

socket.on("connection", (client) => {
  console.log("new connection");
  ++counter;

  client.on("get-counter", () => {
    console.log("counter event received", counter);
    client.broadcast.emit("COUNTER", {
      counter: counter,
    });
  });

  client.broadcast.emit("NEW_CONN_EVENT", {
    msg: "A new client connected",
    nick: client.id,
  });

  client.on("CLIENT_MSG", (data) => {
    client.emit("SERVER_MSG", {
      msg: data.msg,
      nick: client.id,
    });
    client.broadcast.emit("SERVER_MSG", {
      msg: data.msg,
      nick: client.id,
    });
  });

  client.on("disconnect", () => {
    counter = counter - 1;
    client.broadcast.emit("NEW_DISCON_EVENT", {
      msg: "Client disconnected",
      nick: client.id,
      counter: counter,
    });
  });
});

server.listen(5555);

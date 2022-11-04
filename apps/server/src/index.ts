import { createServer } from "http";
import WebSocket, { WebSocketServer } from "ws";

const server = createServer();
const wss = new WebSocketServer({ server });

let score = 0;

wss.on("connection", function connection(ws) {
  wss.clients.forEach((client) => {
    client.send(score);
  });

  ws.on("message", function (data) {
    console.log(data);
    score++;
    wss.clients.forEach((client) => {
      client.send(score);
    });
  });
});

wss.on("close", function () {
  wss.clients.forEach((client) => {
    client.send("disconnected");
  });
});

server.listen(4000);

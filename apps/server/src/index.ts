import { createServer } from "http";
import WebSocket, { WebSocketServer } from "ws";

const server = createServer();
const wss = new WebSocketServer({ server });

let score = 0;

wss.on("connection", function connection(ws) {
  ws.send(JSON.stringify({ type: "INIT", payload: { count: score } }));

  ws.on("message", function (message) {
    console.log(message.toString());
    score++;
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ type: "add", payload: { count: score } }));
    });
  });

  ws.on("close", function () {
    console.log("stopping client interval");
  });
});

server.listen(4000);

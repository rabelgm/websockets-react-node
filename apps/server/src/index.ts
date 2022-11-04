import { createServer } from "http";
import WebSocket, { WebSocketServer } from "ws";

const server = createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  wss.clients.forEach((client) => {
    client.send("message");
  });
});

server.listen(4000);

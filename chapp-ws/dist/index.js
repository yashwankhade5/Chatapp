"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const allRoom = new Map();
wss.on("connection", (socket) => {
    socket.on("message", (wsss) => {
        const wbs = JSON.parse(wsss);
        console.log(wbs);
        if (wbs.type === "join" && wbs.payload.roomid) {
            allRoom.set(socket, wbs.payload.roomid);
            socket.send("connected to the room");
        }
        else if (wbs.type === "chat" && wbs.payload.message) {
            wss.clients.forEach(client => {
                if (client !== socket && allRoom.get(socket) === allRoom.get(client) && client.readyState === ws_1.WebSocket.OPEN) {
                    client.send(JSON.stringify(wbs.payload.message));
                }
            });
        }
    });
    socket.on("close", () => {
        allRoom.delete(socket);
    });
});

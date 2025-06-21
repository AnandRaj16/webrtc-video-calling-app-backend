import express from 'express';
import ServerConfig from './config/serverConfig.js';
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import roomHandler from './handlers/roomHandler.js'; // import the room handler to manage room creation and joining

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    console.log("New user connected");
    roomHandler(socket); // pass the socket connection to the room handler for room creation and joining

    socket.on("disconnected", () => {
        console.log("User disconnected");
    });
});

server.listen(ServerConfig.PORT, () => {
    console.log(`Server is running at port ${ServerConfig.PORT}`);
});
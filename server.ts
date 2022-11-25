import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { WebSocketServer } from "ws";
import { v4 as uuidV4 } from "uuid";

// instances
const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => {
	res.send("hello");
});

const PORT = parseInt(process.env.PORT.toString(), 10) || 8000;

const server = app.listen(PORT, () => {
	console.log(`Server is started on PORT = ${PORT}`);
});

server.on("upgrade", (request, socket, head) => {
	wsServer.handleUpgrade(request, socket, head, (socket) => {
		wsServer.emit("connection", socket, request);
	});
});

let CLIENTS = [];

// web socket stuff
const wsServer = new WebSocketServer({ noServer: true });
wsServer.on("connection", (socket) => {
	let id = uuidV4();
	CLIENTS[id] = socket;
	CLIENTS.push(socket);
	socket.on("message", (msg) => {
		let incomingMsg = JSON.parse(JSON.stringify(msg.toString()));
		sendAll(incomingMsg);
	});

	socket.send("Hello from web socket server!");
});

// send message to all
const sendAll = (message: any) => {
	for (let i = 0; i < CLIENTS.length; i++) {
		CLIENTS[i].send(message);
	}
};

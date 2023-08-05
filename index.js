const express = require("express");
const path = require("path");
const http = require("http");
const app = express();

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static("public"));
app.use((req, res) => {
	res.render("index");
});

var users = {};

io.on("connection", (socket) => {
	const socket_id = socket.id;

	socket.on("user connected", (username) => {
		console.log(`New user connected: ${username}`);
		users[socket_id] = username;
		io.emit("new user", username, users);
	});

	socket.on("disconnect", (data) => {
		const disconnect_user = users[socket_id];
		delete users[socket_id];
		console.log(`User disconnected: ${disconnect_user}`);
		io.emit("disconnect user", disconnect_user, users);
	});

	socket.on("new message", (msg) => {
		console.log(`Broadcasting message: ${msg}`);
		io.emit("new message", msg);
	});
});

server.listen(8080, () => {
	console.log("Listening on port 8080");
});

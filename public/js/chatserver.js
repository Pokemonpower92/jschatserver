var socket = io();

var form = document.getElementById("usermessage");
var input = document.getElementById("message");

var username = prompt("Enter your username:");
socket.emit("user connected", username);

form.addEventListener("submit", function (e) {
	e.preventDefault();
	if (message.value) {
		socket.emit("new message", `${username}: ${message.value}`);
		message.value = "";
	}
});

socket.on("new message", function (msg) {
	$("#messages").append($("<li>").html(msg));
});

socket.on("new user", function (username, users) {
	$("#messages").append($("<li>").html(`${username} has joined the chat.`));
	$("#users").empty();
	Object.keys(users).map((u) =>
		$("#users").append($("<li>").html(`${users[u]}`))
	);
	$("#usercountfield").html(`Connected users: ${Object.keys(users).length}`);
});

socket.on("disconnect user", function (username, users) {
	$("#messages").append($("<li>").html(`${username} has left the chat.`));
	$("#users").empty();
	Object.keys(users).map((u) =>
		$("#users").append($("<li>").html(`${users[u]}`))
	);
	$("#usercountfield").html(`Connected users: ${Object.keys(users).length}`);
});

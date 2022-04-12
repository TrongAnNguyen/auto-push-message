const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.send(`<h1>I'm still working</h1>`);
});

io.on("connection", (socket) => {
  console.log("A user connected");

  const messages = [
    "Hello",
    "Hi",
    "How are you?",
    "I'm fine",
    "Thank you",
    "Bye",
    "See you",
    "Goodbye",
    "See you later",
    "What the hell are you doing here?",
    "I'm not doing anything",
    "Really?",
    "You're not doing anything",
  ];
  const users = [
    { name: "John", color: "#CFD3CD" },
    { name: "Jane", color: "#642424" },
    { name: "Jack", color: "#7E7B52" },
    { name: "Jill", color: "#20214F" },
  ];

  const sendRandomMessage = () => {
    const message = messages[Math.floor(Math.random() * messages.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    socket.emit("chat-message", { type: "chat-message", body: message, user });

    const min = 300;
    const max = 2000;
    const rand = Math.floor(Math.random() * (max - min + 1) + min);
    setTimeout(sendRandomMessage, rand);
  }

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});

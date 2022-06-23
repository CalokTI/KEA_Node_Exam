import express from "express";
import path from "path";

/* Socket.IO */
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();

app.use(express.json());

app.use(express.static(path.resolve("../client/public")));

import usersRouter from "./routers/usersRouter.js";
app.use(usersRouter);

import questionsRouter from "./routers/questionsRouter.js";
app.use(questionsRouter);

const PORT = process.env.PORT || 3000;

/* Socket.IO */
const server = createServer(app);
const io = new Server(server);

let queue = [];

io.sockets.on("connection", (socket) => {
  // https://stackoverflow.com/questions/43280613/set-username-in-socket-io-connection
  io.emit("updateQueue", { queue });

  socket.on("newMessage", (message) => {
    io.emit("chatMessage", { message });
  });

  socket.on("disconnect", () => {});

  socket.on("addHelp", (help) => {
    queue.push(help);
    io.emit("updateQueue", { queue });
  });

  socket.on("wake", (socketID) => {
    io.to(socketID.socketID).emit("nextHelp");
  });

  socket.on("popHelp", (id) => {
    const index = queue.findIndex((user) => user.IDsocket === id.socketID);
    if (index > -1) {
      queue.splice(index, 1);
    }
    io.emit("updateQueue", { queue });
  });
});

/* default/fallback */
app.get("*", (req, res) => {
  res.sendFile(path.resolve("../client/public/index.html"));
});

server.listen(PORT, () => {
  console.log("running on port", PORT);
});

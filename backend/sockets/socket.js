var socketio = require("socket.io");
const { sessionMiddleware } = require("../app");

var io = null;

exports.initialize = function (server) {
  io = socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
  });
  io.on("connection", (socket) => {
    console.log("A client connected with session ID:", socket.request.sessionID); // 세션 ID 로깅

    socket.on("sendComment", (data) => {
      console.log(`Received data: ${data} from session ID: ${socket.request.sessionID}`);
      console.log("UserEmail: ");
      console.log(socket.request.session);
    });
  });

  return io;
};

exports.io = function () {
  return io;
};

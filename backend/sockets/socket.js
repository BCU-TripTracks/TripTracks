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

    socket.on("login", (User_ID) => {
      console.log(`Received login for User_ID: ${User_ID}`);
      socket.join(User_ID);
      console.log(`Socket.io Server joined User_ID: ${User_ID}`);
    });
    socket.on("logout", (User_ID) => {
      console.log(`Received logout for User_ID: ${User_ID}`);
      socket.leave(User_ID);
      console.log(`Socket.io Server left User_ID: ${User_ID}`);
    });

    socket.on("send_message", (data) => {
      const { User_ID, Message } = data;
      // console.log(`Received data: ${data} from session ID: ${socket.request.sessionID}`);
      // console.log("UserEmail: ");
      console.log(socket.request.session.User_ID);
      console.log(User_ID, Message);
    });
  });

  return io;
};

exports.io = function () {
  return io;
};

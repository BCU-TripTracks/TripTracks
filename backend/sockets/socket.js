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
      socket.request.session.User_ID = User_ID;
      console.log(`Socket.io Server joined User_ID: ${User_ID}`);
    });
    socket.on("logout", (User_ID) => {
      console.log(`Received logout for User_ID: ${User_ID}`);
      socket.leave(User_ID);
      console.log(`Socket.io Server left User_ID: ${User_ID}`);
    });

    socket.on("send_message", (data) => {
      const { Room_ID, User_ID, Message, Time } = data;
      console.log(
        `Received message to Room_ID ${Room_ID} User_ID: ${socket.request.session.User_ID} from User_ID: ${User_ID} with message: ${Message} at time: ${Time}`
      );
      io.to(User_ID).emit("receive_message", {
        Room_ID,
        User_ID: socket.request.session.User_ID,
        Message,
        Time,
      });
      io.to(socket.request.session.User_ID).emit("DM_Rooms_Update");
    });
  });

  return io;
};

exports.io = function () {
  return io;
};

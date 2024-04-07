/***
 * 코드 최초 작성자 : 서현진
 * 코드 최초 작성일 : 2024.03.21.
 * 코드 설명:
 * 사용자 회원 가입을 위한 email 중복체크 API 스크립트
 */

var express = require("express");
var router = express.Router();
const DBconn = require("../../utils/DBconn");
const moment = require("moment");
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const rooms = {}; // 방 이름을 키로 하고, 방에 참여한 사용자 목록을 값으로 하는 객체

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
    // 사용자가 접속을 끊었을 때, 해당 사용자가 속한 모든 방에서 사용자 목록에서 제거
    for (const roomName in rooms) {
      if (rooms.hasOwnProperty(roomName)) {
        const index = rooms[roomName].indexOf(socket.userId);
        if (index !== -1) {
          rooms[roomName].splice(index, 1);
          io.to(roomName).emit('user left', { userId: socket.userId, room: roomName });
        }
      }
    }
  });

  // 사용자가 특정 방에 참여하는 경우
  socket.on('join room', (roomName, userId) => {
    socket.join(roomName);
    socket.userId = userId;

    if (!rooms[roomName]) {
      rooms[roomName] = [];
    }

    if (!rooms[roomName].includes(userId)) {
      rooms[roomName].push(userId);
      io.to(roomName).emit('user joined', { userId: userId, room: roomName });
    }
  });

  // 특정 방에 메시지를 전송하는 경우
  socket.on('chat message', (data) => {
    const { roomName, message } = data;
    io.to(roomName).emit('chat message', { userId: socket.userId, message: message, room: roomName });
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

const socketIO = require('socket.io')
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`${socket} 사용자 소켓 접속함`);

  })
};


import { io } from "socket.io-client";

// const socket = io("http://triptracks.co.kr");
const socket = io("http://localhost:6510");
socket.on("connect", () => {
  console.log("Connected to the server");
});
export default socket;

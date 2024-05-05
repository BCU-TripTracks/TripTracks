import { io } from "socket.io-client";

const socket = io("http://triptracks.co.kr");
socket.on("connect", () => {
  console.log("Connected to the server");
});
export default socket;

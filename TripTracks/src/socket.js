import { io } from "socket.io-client";

const socket = io("http://triptracks.co.kr");

export default socket;

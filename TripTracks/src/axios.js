// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  // 여기에 설정을 추가합니다.
  baseURL: "http://triptracks.co.kr/api",
  // baseURL: "http://localhost:6510/api",
});

export default axiosInstance;

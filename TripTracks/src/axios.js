// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  // 여기에 설정을 추가합니다.
  baseURL: "http://triptracks.co.kr/api",
});

export default axiosInstance;

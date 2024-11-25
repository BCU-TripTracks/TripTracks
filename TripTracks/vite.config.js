import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "../backend/triptracks", // 빌드 출력 디렉토리를 'buildOutput'으로 설정
  },
  server: {
    proxy: {
      // 백엔드 API 요청을 위한 프록시 설정
      "/api": {
        target: "http://triptracks.co.kr", // 백엔드 서버의 실제 URL
        // target: "http://localhost:6510", // 백엔드 서버의 실제 URL
        changeOrigin: true, // cross-origin 요청을 위해 origin 헤더를 변경
        secure: false, // HTTPS 사용 시 true로 설정
        rewrite: (path) => path.replace(/^\/api/, ""), // 요청 URL에서 /api를 제거
      },
    },
  },
});

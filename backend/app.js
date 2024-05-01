var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const session = require("express-session");

var app = express();

// 세션 설정
var sessionMiddleware = session({
  secret: "triptracks_key",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
});

// CORS 설정
app.use(
  cors({
    origin: [
      "http://localhost:5171",
      "http://localhost:5172", // 다른 로컬 호스트 포트 추가
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      "http://localhost:5177",
      "http://localhost:5178",
      "http://localhost:5179",
      "http://localhost:5180",
      "http://triptracks.co.kr",
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API 경로 설정
var apiRouter = require("./routes/index");
app.use("/api", apiRouter);

// 정적 파일 서비스
app.use(express.static(path.join(__dirname, "public")));
app.use("/imgServer", express.static(path.join(__dirname, "imgServer")));
app.use(express.static(path.join(__dirname, "triptracks")));

// 뷰 엔진 설정
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// 세션 미들웨어
app.use(sessionMiddleware);

// Vue 애플리케이션의 진입점을 위한 경로 Fallback 설정
app.get(/^(?!\/api|\/apidoc|\/imgServer).*$/, function (req, res) {
  res.sendFile(path.resolve(__dirname, "triptracks", "index.html"));
});

// 에러 핸들러
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = { app, sessionMiddleware };

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const session = require("express-session");

var apiRouter = require("./routes/index");

var app = express();

app.use(
  cors({
    // origin: ["*", "http://triptracks.co.kr"], // 이 도메인에서만 요청을 허용합니다.
    origin: "*", // 이 도메인에서만 요청을 허용합니다.
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "triptracks_key", // 세션을 안전하게 유지하는 데 사용되는 비밀키
    resave: false, // 세션을 항상 저장할지 여부 (변경되지 않았어도)
    saveUninitialized: true, // 초기화되지 않은 세션을 저장소에 저장할지 여부
    cookie: {
      secure: false, // true로 설정하면 HTTPS를 통해서만 쿠키 전송
      httpOnly: true, // 클라이언트 측 JavaScript가 문서의 쿠키를 읽을 수 없음
      maxAge: 1000 * 60 * 60, // 쿠키 유효 시간 (여기서는 1시간)
    },
  })
);

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/apidoc", express.static(path.join(__dirname, "apidoc")));
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

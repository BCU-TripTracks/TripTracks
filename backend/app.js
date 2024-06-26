var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const session = require("express-session");

var sessionMiddleware = session({
  secret: "triptracks_key", // 세션을 안전하게 유지하는 데 사용되는 비밀키
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // HTTPS를 사용하지 않는 경우 false로 설정합니다.
});

var apiRouter = require("./routes/index");

var app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5171",
      "http://localhost:5172",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      "http://localhost:5177",
      "http://localhost:5178",
      "http://localhost:5179",
      "http://localhost:5180",
      "http://triptracks.co.kr",

      "*",
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionMiddleware);

app.use("/imgServer", express.static("/home/ImgServer"), (req, res, next) => {
  console.log(`Accessing files under /imgServer: ${req.url}`);
  next();
});
app.use(express.static(path.join(__dirname, "triptracks")));
app.use("/apidoc", express.static(path.join(__dirname, "apidoc")));
app.use("/api", apiRouter);
// app.use("/imgServer", express.static(path.join(__dirname, "imgServer")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./triptracks/index.html"));
});

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

module.exports = { app, sessionMiddleware };

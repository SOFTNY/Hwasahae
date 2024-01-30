const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv"); //.env파일 관리 모듈
dotenv.config({ path: ".env.local" }); //.env.local로 기본 경로 설정

const path = require("path");

const viewRouter = require("./Routes/viewRoutes");
const categoryRoute = require("./Routes/categoryRoutes");
const userRoute = require("./Routes/userRoutes");
const productRoute = require("./Routes/productRoutes");
const orderRoute = require("./Routes/orderRoutes");
const adminRoute = require("./Routes/adminRoutes");
const logHandler = require("./utils/logHandler");
const errorHandler = require("./utils/errorHandler");

//express app 생성
const app = express();

// middleware functions
app.use(express.json()); // JSON 형태의 요청 body를 파싱하기 위해 express.json() 미들웨어를 사용
app.use(cookieParser());
app.use(cors()); //cors 미들웨어 등록

// 이미지 정적 파일을 제공하는 폴더로 지정
// app.use(
//   "/shopimages",
//   express.static("./Views/src/pages/Product/img/shopimages")
// );
app.use(
  "/img/shopimages",
  express.static(path.join(__dirname, "Views/src/pages/Product/img/shopimages"))
);

//html, css, js 라우팅
app.use(viewRouter);
app.use("/", userRoute);
app.use("/category", categoryRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send(
    "어서오세요 여러분의 서버에~ 모두 만나서 반가워요 ㅎㅎㅎㅎㅎ user개발 완료!"
  );
});

//오류로그 미들웨어
app.use(logHandler);
// 오류처리 미들웨어
app.use(errorHandler);

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

//server 연결
app.listen(port, (req, res) => {
  console.log(`Server running on port : ${port}`);
});

//DB 연결
mongoose
  .connect(uri, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection established");
  })
  .catch((error) => {
    console.log("MongoDB connection failed!!! : ", error.message);
  });

//DB 커넥션 관리 이벤트 :: 연결 확인 log
//연결 완료
mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});
//연결이 끊김
mongoose.connection.on("disconnected", () => {
  console.log("disconnected");
});
//재연결 완료
mongoose.connection.on("reconnected", () => {
  console.log("reconnected");
});
//재연결 시도 횟수 초과
mongoose.connection.on("reconnectFailed", () => {
  console.log("reconnectFailed");
});

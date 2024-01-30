const UserService = require("../Services/UserService");
const asyncHandler = require("../utils/asyncHandler");

//서비스 가져오기
const UserServiceInstance = new UserService();

//회원가입
const registerUser = asyncHandler(async (req, res) => {
  const user = await UserServiceInstance.Singup(req.body);

  res.status(200).json(user);
});

//로그인
const loginUser = asyncHandler(async (req, res) => {
  const user = await UserServiceInstance.SignIn(req.body);

  //서비스단에서 수정하기(피드백) - dto(data transfer object)
  res.cookie("accessToken", user?.accessToken, {
    httpOnly: true,
  });
  res.cookie("refreshToken", user?.refreshToken, {
    httpOnly: true, //  자바스크립트로 브라우저의 쿠키에 접근하는 것을 막기 위한 옵션
  });

  //dto class 생성 후 관리하기..!
  //비즈니스 로직 철저히 분리 가능
  delete user.accessToken;
  delete user.refreshToken;
  res.status(200).json(user);
});

//로그아웃
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json("로그아웃 되었습니다.");
});

//특정 유저 정보 조회
const getUserInfo = asyncHandler(async (req, res) => {
  const user = await UserServiceInstance.FindById(res.locals.userInfo);

  res.status(200).json(user);
});

//특정 유저 정보 수정
const updateUserInfo = asyncHandler(async (req, res) => {
  const user = await UserServiceInstance.UpdateById(
    res.locals.userInfo,
    req.body
  );

  res.status(200).json(user);
});

//특정 유저 정보 삭제
const removeUserInfo = asyncHandler(async (req, res) => {
  const user = await UserServiceInstance.DeleteById(
    res.locals.userInfo,
    req.body.password
  );

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json(user);
});

//모든 유저 정보 가져오기
const getUsers = asyncHandler(async (req, res) => {
  const users = await UserServiceInstance.FindAll(
    res.locals.userInfo,
    req.query.page
  );

  res.status(200).json(users);
});

// 이메일 인증번호 보내기
const getAuthNo = asyncHandler(async (req, res) => {
  const result = await UserServiceInstance.SendEmail(req.body.email);
  res.status(200).json(result);
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserInfo,
  updateUserInfo,
  removeUserInfo,
  getUsers,
  getAuthNo,
};

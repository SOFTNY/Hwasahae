const { body, validationResult } = require("express-validator");

//검사 미들웨어
const validate = (req, res, next) => {
  const errors = validationResult(req);

  //유효성 검사를 모두 통과해서 오류가 없다면
  if (errors.isEmpty()) {
    return next();
  }

  //유효성 검사를 통과하지 못했다면
  //오류 반환
  const error = new Error(`${errors.array()[0]?.msg}`);
  error.status = 400;
  throw error;
};

//유저 회원가입 유효성 검사
const userRegisterValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("이메일은 필수 입력 사항입니다.")
      .trim()
      .isEmail()
      .withMessage("이메일 형식이 맞지 않습니다."),
    body("name").notEmpty().withMessage("이름은 필수 입력 사항입니다.").trim(),
    body("password")
      .notEmpty()
      .withMessage("비밀번호는 필수 입력 사항입니다.")
      .trim()
      .isStrongPassword()
      .withMessage("비밀번호 형식에 맞지 않습니다."),
  ];
};

//유저 로그인 유효성 검사
const userLoginValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("이메일은 필수 입력 사항입니다.")
      .trim()
      .isEmail()
      .withMessage("이메일 형식이 맞지 않습니다."),
    body("password")
      .notEmpty()
      .withMessage("비밀번호는 필수 입력 사항입니다.")
      .trim()
      .isStrongPassword()
      .withMessage("비밀번호 형식에 맞지 않습니다."),
  ];
};

//이메일 유효성 검사
const userEmailValidator = () => {
  return body("email")
    .notEmpty()
    .withMessage("이메일은 필수 입력 사항입니다.")
    .trim()
    .isEmail()
    .withMessage("이메일 형식이 맞지 않습니다.");
};

module.exports = {
  validate,
  userRegisterValidator,
  userLoginValidator,
  userEmailValidator,
};

//email
const email = document.querySelector("#email");
const email_message = document.querySelector("#email-message");

//password
const pwd = document.querySelector("#pwd");
const validationMessage = document.querySelector("#pw-message");
const rePwd = document.querySelector("#rePwd");
const confirmPw_message = document.querySelector("#confirmPw-message");

//회원가입 버튼
const submit = document.querySelector("#submit");

/**
 * 이메일
 */
function validateEmail() {
  let emailVal = email.value;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (emailVal === "") {
    email_message.textContent = ""; //값이 비어있을 경우 공백으로 두기
    return;
  }
  if (!emailRegex.test(emailVal)) {
    email_message.textContent = "올바른 이메일 주소 형식이 아닙니다!";
    email_message.style.color = "red";
    return;
  }
  email_message.textContent = "유효한 이메일 주소입니다!";
  email_message.style.color = "green";
}

email.addEventListener("input", validateEmail);

/**
 * 비밀번호
 */
function validatePassword() {
  let pwdVal = pwd.value;
  const pwRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (pwdVal === "") {
    validationMessage.textContent = ""; //값이 비어있을 경우 공백으로 두기
    return;
  }

  if (!pwRegex.test(pwdVal)) {
    validationMessage.textContent =
      "8글자 이상, 영문, 숫자, 특수문자 사용해주세요!";
    validationMessage.style.color = "red";
    return;
  }
  validationMessage.textContent = "비밀번호가 안전합니다!";
  validationMessage.style.color = "green";
}
pwd.addEventListener("input", validatePassword);

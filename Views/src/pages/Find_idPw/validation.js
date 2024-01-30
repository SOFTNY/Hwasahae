//email
const email = document.querySelector("#email");
const email_message = document.querySelector("#email-message");

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
 * 폰 번호
 */
function oninputPhone(target) {
  target.value = target.value
    .replace(/[^0-9]/g, "")
    .replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{4})([0-9]{4})/g, "$1-$2-$3");
}

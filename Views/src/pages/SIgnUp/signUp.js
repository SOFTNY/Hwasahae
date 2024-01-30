/* 요소모음 */
// console.log("들어오나?");
const name1 = document.querySelector("#name");
const email = document.querySelector("#email");
const pwd = document.querySelector("#pwd");
const rePwd1 = document.querySelector("#rePwd");
const roadAddress = document.querySelector("#sample4_roadAddress");
//도로명주소
const zipcode = document.querySelector("#sample4_postcode"); //우편번호
const detailAddress = document.querySelector("#sample4_detailAddress"); //상세주소
const role = document.querySelector("#role");
// const postcode1 = document.querySelector("#sample4_postcode1");
// const extraAddress1 = document.querySelector("#sample4_extraAddress1");

//회원가입 버튼이 눌렸을 때 동작
const submitEvent = () => {
  const submitBtn = document.getElementById("submit");
  submitBtn.addEventListener("click", registerResponse);
};

/* 회원가입 api */
const registerResponse = async (e) => {
  e.preventDefault();
  // console.log("안녕5555555");
  const register_URL = "/register";

  const formData = new FormData();
  formData.append("name", name1?.value);
  formData.append("email", email?.value);
  formData.append("password", pwd?.value);
  formData.append("zipcode", zipcode?.value);
  formData.append("address", roadAddress?.value);
  formData.append("detailAddress", detailAddress?.value);
  formData.append("role", "구매자");

  const option = {
    method: "POST",
    body: formData,
  };

  await fetch(register_URL, {
    ...option,
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res?.result) {
        location.href = "/registerOk";
      } else {
        if (res?.result === "fail") {
          console.log("res", res);
          alert(res.error);
          return alert("회원가입 실패");
        }
      }
    });
};

submitEvent();

// 페이지 로딩 시 실행될 함수
window.onload = function () {
  // 사용자가 입력한 값이 존재하면 페이지를 새로고침하여 값 초기화
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  });
};

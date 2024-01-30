/* 요소모음 */
const email = document.querySelector("#email");
const pwd = document.querySelector("#pwd");

//로그인 버튼이 눌렸을 때 동작
const loginEvent = () => {
  const loginBtn = document.getElementById("login-btn");
  loginBtn.addEventListener("click", loginResponse);
};

/* 로그인 api */
const loginResponse = async (e) => {
  e.preventDefault();
  const login_URL = "/login";

  const formData = new FormData();
  formData.append("email", email?.value);
  formData.append("password", pwd?.value);

  const option = {
    method: "POST",
    body: formData,
  };

  await fetch(login_URL, {
    ...option,
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res?.result) {
        localStorage.setItem("userInfo", JSON.stringify(res));
        alert("로그인이 되셨습니다!");
        location.href = "/";
      } else {
        if (res?.result === "fail") {
          alert(res?.error);
        }
      }
    });
};

loginEvent();

/* 비회원 구매 버튼 동작처리 */
// const nonMember = document.querySelector("#nonMember");

// //비회원 - 장바구니 버튼을 누르면 로컬스토리지에 상품이 담겨져서 장바구니 페이지로 이동
// function moveToCart() {
//   const cartProducts = JSON.parse(localStorage.getItem("cart"));
//   if (cartProducts.length > 0) {
//     alert("장바구니 페이지로 이동합니다!");
//     location.href = "/cart/";
//   } else {
//     alert("장바구니에 상품이 없습니다!");
//   }
// }

// nonMember.addEventListener("click", () => {
//   moveToCart();
// });

// //비회원 - 바로가기 버튼을 누르면 로컬스토리지에 상품이 담겨져서 결제페이지로 이동
// function moveToPayment() {
//   const buyProducts = JSON.parse(localStorage.getItem("buyItem"));

//   if (buyProducts.length > 0) {
//     alert("결제 페이지로 이동합니다.");
//     location.href = "/payment/";
//   } else {
//     alert("처리가 잘 되지 않으셨습니다");
//   }
// }

// nonMember.addEventListener("click", () => {
//   moveToPayment();
// });

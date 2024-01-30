// API 정보 가져와 화면에 뿌리는 코드
fetch("/users/my", { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    const myInfoMap = `
      <!-- 이름 -->
      <div class="w-100">
        <div>
          <label for="name" class="detail_title">이름</label>
          <input class="form-input" id="name" name="name" value="${
            data.name
          }"></input>
        </div>
      </div>
      <!-- 아이디 -->
      <div class="w-100">
        <div>
          <label for="name" class="detail_title">아이디</label>
          <input class="form-input" id="id" value="${
            data.email
          }" disabled></input>
        </div>
      </div>
      <!-- 비밀번호 -->
      <div class="w-100">
        <div>
          <label for="name" class="detail_title">비밀번호</label>
          <input class="form-input" type="password" id="pwd" name="password">
        </div>
      </div>
      <!-- 주소 -->
      <div class="w-100">
        <div>
          <label for="address" class="detail_title">주소</label>
          <div>
            <input type="text" id="sample4_postcode" placeholder="" value="${
              data.zipcode || ""
            }" name="zipcode">
            <input type="button" class="btn" id="addressBtn" onclick="sample4_execDaumPostcode()" value="우편번호 찾기">
            <input type="text" class="address-input" id="sample4_roadAddress" placeholder="" value="${
              data.address || ""
            }" name="address">
            <input type="text" class="address-input" id="sample4_detailAddress" placeholder="" value="${
              data.detailAddress || ""
            }" name="detailAddress">
          </div>
        </div>
      </div>
    `;

    const productContainer = document.querySelector(".title");
    productContainer.innerHTML = myInfoMap;
  });

// 수정된 함수로 API 요청 수행
const submitForm = (event) => {
  event.preventDefault();
  const form = document.querySelector("#userform");

  fetch("/users/my", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: form.name.value,
      password: form.password.value,
      zipcode: form.zipcode.value,
      address: form.address.value,
      detailAddress: form.detailAddress.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("회원 정보 수정 성공:", data);
      // 성공 시 추가적인 로직을 여기에 작성하세요.
      if (data?.result === "fail") {
        return alert(data.error);
      }
      alert("회원 정보가 성공적으로 수정되었습니다.");
      location.reload();
    })
    .catch((error) => {
      console.error("회원 정보 수정 실패:", error);
      // 실패 시 추가적인 로직을 여기에 작성하세요.
      alert("회원 정보 수정에 실패했습니다. 다시 시도해주세요.");
    });
};

// 수정 버튼이 눌렸을 때 동작
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", submitForm);

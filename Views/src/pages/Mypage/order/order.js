// API 정보 가져와 화면에 뿌리는 코드
fetch("/users/my", { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    console.log("data: ", data);
    const myInfoMap = `
      <!-- 이름 -->
      <div class="w-100">
        <div>
          <label for="name" class="detail_title">이름</label>
          <span class="form-input" id="name">${data.name}</span>
        </div>
      </div>
      <!-- 아이디 -->
      <div class="w-100">
        <div>
          <label for="name" class="detail_title">아이디</label>
          <span class="form-input" id="id">${data.id}</span>
        </div>
      </div>
      <!-- 비밀번호 -->
      <div class="w-100">
        <div>
          <label for="name" class="detail_title">비밀번호</label>
          <input class="form-input" type="password" id="pwd">
        </div>
      </div>
      <!-- 비밀번호 확인 -->
      <div class="w-100">
        <div>
          <label for="name" class="detail_title">비밀번호 확인</label>
          <input class="form-input" type="password" id="rePwd">
        </div>
      </div>
      <!-- 이메일 -->
      <div class="w-100">
        <div>
          <label for="email" class="detail_title">이메일</label>
          <input class="form-input" type="email" id="email" placeholder="email@naver.com" value="${data.email}">
          <p class="msg" id="email-message"></p>
        </div>
      </div>
      <!-- 주소 -->
      <div class="w-100">
        <div>
          <label for="address" class="detail_title">주소</label>
          <div>
            <input type="text" id="sample4_postcode" placeholder="" value="${data.zipcode}">
            <input type="button" class="btn" id="addressBtn" onclick="sample4_execDaumPostcode()" value="우편번호 찾기">
            <input type="text" class="address-input" id="sample4_roadAddress" placeholder="" value="${data.address}">
            <input type="text" class="address-input" id="sample4_detailAddress" placeholder="" value="${data.detailAddress}">
          </div>
        </div>
      </div>
    `;

    const productContainer = document.querySelector(".title");
    productContainer.innerHTML = myInfoMap;
  });

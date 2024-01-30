// 회원 이름 API 정보 가져와 화면에 뿌리는 코드
fetch("/users/my", { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    console.log("data: ", data);
    const myInfoMap = `
            <p class="member">
                ${data.name}님
            </p>
            `;

    const productContainer = document.querySelector(".user-info");
    productContainer.innerHTML = myInfoMap;
  });

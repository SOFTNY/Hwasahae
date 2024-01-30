document.addEventListener("DOMContentLoaded", function () {
  // 삭제 폼과 결과를 나타내는 div 요소 가져오기
  // const deleteForm = document.getElementById('deleteForm');
  const resultDiv = document.getElementById("result");
  const button = document.querySelector("#button"); // 확인 버튼 가져오기

  // 확인 버튼 클릭 시
  button.addEventListener("click", function (event) {
    event.preventDefault(); // 기본 동작 방지 (폼 제출 방지)

    // 입력된 비밀번호 가져오기
    const password = document.getElementById("password").value;

    // API에 보낼 요청 본문 작성
    const requestBody = {
      password: password,
    };

    // 서버로 DELETE 요청 보내기
    fetch("/users/my", {
      method: "DELETE", // DELETE 메서드 사용
      headers: {
        "Content-Type": "application/json", // JSON 형식의 데이터 전송
      },
      body: JSON.stringify(requestBody), // 요청 본문 설정
    })
      .then((response) => {
        if (!response.ok) {
          // 오류 발생 시 에러 처리
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // 응답 JSON으로 변환
      })
      .then((data) => {
        // 삭제 성공 시
        console.log(data);
        if (data && data.deletedAt) {
          localStorage.removeItem("cart");
          localStorage.removeItem("userInfo");
          localStorage.removeItem("buyItem");
          alert("탈퇴가 완료되셨습니다.");
          //홈페이지로 이동
          window.location.href = "/";
        } else {
          // 예상치 못한 서버 응답 시
          //   alert("비밀번호가 일치하지 않습니다!");
        }
      })
      .catch((error) => {
        // 오류 발생 시
        //   resultDiv.innerHTML = `<p>에러: ${error.message}</p>`;
        alert("비밀번호가 일치하지 않습니다!");
      });
  });
});

// 주문 내역 테이블
const order_table = document.querySelector(".order_table");

window.onload = function () {
  console.log("주문 관리 페이지");
  // 5000

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  //주문조회
  fetch("/admin/order", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("통신 성공! 이건 주문한 내역", result);
      order_table.innerHTML = createOrderList(result);
    })
    .catch((error) => {
      console.log("error가 발생했어요!", error);
      order_table.innerHTML = `  
    <td colspan='7' align="center">오류가 발생했어요 😨  </td>`;
    });
};
// on load ~

const clickModify = (e) => {
  console.log("xpxpxpxpxp테스트", e);
  location.href = "order-modify.html?orderNo=123&orderUserId=vision";
};
// 날짜 변환 함수
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("ko-KR", { hour12: true }); // 12시간제로 표시
};
// 번호 형식 변환 함수
const formatPhoneNumber = (phoneNumber) => {
  // 숫자만 추출
  const digits = phoneNumber.replace(/\D/g, "");
  // 정규 표현식을 사용하여 형식 지정
  const match = digits.match(/^(\d{2,3})(\d{3,4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};

// const createOrderList = (data)=>{
//   return data.reduce((prev,cur)=> prev+ `
//   <tr>
//                         <td>${cur.createdAt}</td>
//                         <td>${cur.userId}</td>
//                         <td>${cur["receiver"].phone}</td>
//                         <td>${cur.totalPrice}</td>
//                         <td>${cur["receiver"].address}</td>
//                         <td>${cur.status}</td>
//                         <td><button type="button" class="btn btn-primary rounded-pill"
//                           onclick="location.href='order-modify.html?orderNo=${cur.totalPrice}&orderUserId=${cur.userId}'"
//                           >수정</button></td>
//                           <button type="delete" class="btn btn-danger" id="delete_button" onclick="postDeleteData()">삭제</button>
//                       </tr>
//   `,'')
//  }// location.href='order-modify.html'

// 금액 형식 변환 함수
const formatCurrency = (amount) => {
  return amount.toLocaleString("ko-KR");
};

const createOrderList = (data) => {
  return data.reduce((prev, cur) => {
    const formattedDate = formatDate(cur.createdAt); // 변환된 날짜
    const userName = cur.userId.name; // 사용자 이름
    const formattedPhone = formatPhoneNumber(cur["receiver"].phone); // 번호 - 추가
    const formattedTotalPrice = formatCurrency(cur.totalPrice); // 단위별 , 추가
    return (
      prev +
      `
      <tr id=${cur["_id"]}>
          <td>${formattedDate}</td>
          <td>${userName}</td>
          <td>${formattedPhone}</td>
          <td>${formattedTotalPrice}</td>
          <td>${cur["receiver"].address}</td>
          <td>${cur.status}</td>
          <td><button type="button" class="btn btn-primary rounded-pill btn-sm"
              onclick="location.href='order-modify.html?orderNo=${cur._id}'"
              >수정</button></td>
      </tr>
  `
    );
  }, "");
}; // location.href='order-modify.html'

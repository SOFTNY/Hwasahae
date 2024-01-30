// 회원 이름 API 정보 가져와 화면에 뿌리는 코드
fetch("/users/my", { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    const myInfoMap = `${data.name}님`;
    const body = `
    <!-- 이름 -->
    <div class="w-100">
      <div>
        <label for="name" class="detail_title">이름</label>
        <input class="form-input" id="name" name="name" value="${
          data.name
        }" disabled></input>
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
    <!-- 주소 -->
    <div class="w-100">
      <div>
        <label for="address" class="detail_title">주소</label>
        <div>
          <input type="text" id="sample4_postcode" placeholder="" value="${
            data.zipcode || ""
          }" name="zipcode" disabled>
          <input type="text" class="address-input" id="sample4_roadAddress" placeholder="" value="${
            data.address || ""
          }" name="address" disabled>
          <input type="text" class="address-input" id="sample4_detailAddress" placeholder="" value="${
            data.detailAddress || ""
          }" name="detailAddress" disabled>
        </div>
      </div>
    </div>
  `;

    const productContainer = document.querySelector(".user-info");
    const bodyContainer = document.querySelector(".title");
    productContainer.append = myInfoMap;
    bodyContainer.innerHTML = body;
  });

//주문 API 가져오는 코드
// fetch("/orders/", { method: "GET" })
//   .then((response) => response.json())
//   .then((data) => {
//     const contents =
//       data?.length === 0 || !data
//         ? ` <td colspan="5">
//                 <div class="tb-center">주문 내역이 없습니다.</div>
//             </td>`
//         : data.reduce`
//         <tr>
//             <!-- 주문있을때 -->
//             <td>
//                 <img src="./img/product_1.jpg" alt="상품 이미지" style="width: 100px;
//                 height: 100px;">
//             </td>
//             <td>
//                 <span class="product_name">${item_date.productName}</span>
//             </td>
//             <td>
//                 <input class="item_many" type="text" value="${item_su}">
//             </td>
//             <td><span class="item_total">${total_price()}</span>원</td>
//             <td><button class="Btn"><a href="/pages/Mypage/order/order.html"></a>자세히보기</button></td>
//          </tr>
//             `;

//     const myInfoMap = contents;

//     const productContainer = document.querySelector("tbody");
//     productContainer.innerHTML = myInfoMap;
//   });

// const createOrderList = (data) => {
//   return data.reduce((prev, cur) => {
//     return (
//       prev +
//       `
//       <tr id="${cur["_id"]}">
//         <td>
//             <img src="#" alt="상품 이미지" style="width: 100px;
//             height: 100px;">
//         </td>
//         <td>
//             <span class="product_name">${item_date.productName}</span>
//         </td>
//         <td>
//             <input class="item_many" type="text" value="${item_su}">
//         </td>
//         <td><span class="item_total">${total_price()}</span>원</td>
//         <td><button class="Btn"><a href="/pages/Mypage/order/order.html"></a>자세히보기</button></td>
//     </tr>
//     `
//     );
//   }, "");
// };

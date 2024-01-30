//장바구니의 주문리스트 그대로 가져오는 로직 start
/*상품금액*/
const priceProduct = document.querySelector("#priceProduct");

// const total_Price = localStorage.getItem("totalPrice"); //cart - 로컬스토리지에 저장되어있는 totalPrice

/*총 결제 금액 => total = 상품금액 + 배송비*/
const total = document.querySelector("#total"); //총합 금액(상품 + 배송비)
const total_price = document.querySelector("#total_price");

// const cartTotalPrice = JSON.parse(localStorage.getItem("totalPrice"));

//배송비
let deliveryPrice = 3000;
const deliveryFee = document.querySelector("#deliveryFee");
deliveryFee.innerHTML = `${deliveryPrice
  .toString()
  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;

//빈 배열 반환 getItems 변수
let getItems = [];
// "cart"가 존재하면 "cart"를 가져오고, 그렇지 않으면 "buyItem"을 가져옴
if (localStorage.getItem("cart")) {
  getItems = JSON.parse(localStorage.getItem("cart"));
  const cart_totalPrice = localStorage.getItem("totalPrice"); //cart에 해당 로컬스토리지에서 total금액 가져오기

  //cart 로컬스토리지 => 상품금액 가져오기
  priceProduct.innerHTML = `${cart_totalPrice}원`; //cart의 상품 총 금액값

  //cart 총 금액
  total.innerHTML = `${(
    parseInt(cart_totalPrice.replace(/,/g, "")) + parseInt(deliveryPrice)
  )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;

  total_price.innerHTML = `${(
    parseInt(cart_totalPrice.replace(/,/g, "")) + parseInt(deliveryPrice)
  )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;
} else if (localStorage.getItem("buyItem")) {
  getItems = JSON.parse(localStorage.getItem("buyItem"));
  priceProduct.innerHTML = `${getItems[0].total_price}원`;

  //buyItem 로컬스토리지 => 총 금액
  total.innerHTML = `${(
    parseInt(getItems[0].total_price.replace(/,/g, "")) +
    parseInt(deliveryPrice)
  )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;
  total_price.innerHTML = `${(
    parseInt(getItems[0].total_price.replace(/,/g, "")) +
    parseInt(deliveryPrice)
  )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;
}

// id의 끝자리 값을 기준으로 아이템 정렬
const sortedItems = getItems.sort((a, b) => {
  const lastDigitA = a.id % 10;
  const lastDigitB = b.id % 10;
  return lastDigitA - lastDigitB;
});

const itemMap = sortedItems.forEach((item, index) => {
  fetch(`/products/${item.id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      //갯수
      let item_su = item.count || 1; // 수량이 없으면 1로 설정

      //총 상품 가격
      let total_price = () => {
        const total_num = data.price * item_su;
        return total_num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

      const MapItem = `
    <tr data-index="${index}">
      <td><img src="${data.images[0]}" alt="상품 이미지" style="width: 100px; height: 100px;"></td>
      <td><span class="product_name">${data.name}</span></td>
      <td>
        <input class="item_many" type="text" value="${item_su}" data-index="${index}">
      </td>
      <td><span class="item_total">${total_price()}</span>원</td>
    </tr>
  `;

      const pageSleeted = document.querySelector("#productTable");
      pageSleeted.innerHTML += MapItem;
    });
});
//장바구니의 주문리스트 그대로 가져오는 로직 end

let totalPrice = 0; //총가격 초기

// 각 fetch 요청을 저장할 배열 만들기.
const fetchPromises = getItems.map(async (item) => {
  const response = await fetch(`/products/${item.id}`);
  return await response.json();
});
console.log(fetchPromises);

// fetch 요청으로 위에서 만든 리절트쪽에 있는 데이터를 프로미스 올로 사용.
Promise.all(fetchPromises).then((productDataArray) => {
  getItems.forEach((index) => {
    const data = productDataArray[index]; //각 배열순서에맞는 데이터를 담는다.
    console.log(data);

    const MapItem = ``;

    console.log("totalPrice", totalPrice);

    const pageSleeted = document.querySelector("#productTable");
    pageSleeted.innerHTML += MapItem; //html

    // const totalElement = () => {
    //   const totalBox = document.getElementById("totalPrice");
    //   totalBox.innerHTML = `총 가격: ${totalPrice
    //     .toString()
    //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;
    // }; // 총 가격을 표시할 위치에 id="totalPrice"인 요소를 추가
    // totalElement();
  });
});

//회원가입한 사용자는 주문자 정보와 배송 정보의 값이 바로 들어오게 해야함

/**
 * 회원가입 한 주문자 정보, 배송 정보 가져오기
 * 비회원일 시에는 직접 입력해야함
 * 전화번호는 직접 작성해줘야함 -> input값에 필수인 것을 입력하지 않았을 경우
 * alert알려주고 필수 입력을 다 했을 경우는 결제하기 버튼을 눌렀을 때 결제가 넘어가게 하기
 */
// 로컬스토리지에서 사용자 정보 가져오기
const storedUserInfo = localStorage.getItem("userInfo");
if (storedUserInfo) {
  // 저장된 사용자 정보가 있다면 결제 페이지의 입력 필드에 자동으로 채우기
  const userInfo = JSON.parse(storedUserInfo);

  //주문자 정보 가져오기
  document.querySelector("#name1").value = userInfo.name;
  document.querySelector("#email1").value = userInfo.email;

  //배송 정보
  document.querySelector("#name2").value = userInfo.name;
  document.querySelector("#sample4_postcode").value = userInfo.zipcode;
  document.querySelector("#sample4_roadAddress").value = userInfo.address;
  document.querySelector("#sample4_detailAddress").value =
    userInfo.detailAddress;
}

const info_checkBox = document.getElementById("info_checkBox");

/*체크박스 정보*/
function getCheckboxValue() {
  if (info_checkBox.checked) {
    name2.value = name1.value;
    phone2.value = phone1.value;
  } else {
    name2.value = "";
    phone2.value = "";
  }
}

info_checkBox.addEventListener("change", () => {
  getCheckboxValue();
});

/* 결제 api */
async function paymentResponse(e) {
  e.preventDefault();
  const payment_URL = "/orders/";
  const req = {
    receiver: {
      name: name1,
      phone: phone1,
      address: roadAddress,
    },
    //
    orderedItems: [
      {
        quantity: itemCount,
        price: itemPrice,
        product: productName,
      },
    ],
    //총 결제 금액
    deliveryFee: deliveryFee,
    totalPrice: totalPrice,
  };

  const option = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  };

  await fetch(payment_URL, {
    ...option,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/paid"; //결제성공
      } else {
        if (res.err) {
          return alert("결제 실패");
        }
      }
    });
}

//취소 및 결제 버튼
const cancelBtn = document.querySelector(".cancelBtn");
const paymentBtn = document.querySelector(".paymentBtn");

paymentBtn.addEventListener("click", function () {
  const cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
  const buyItem = JSON.parse(localStorage.getItem("buyItem"));

  if (cartProducts.length > 0 || buyItem.length > 0) {
    alert("결제가 성공적으로 완료되었습니다");
    localStorage.removeItem("cart"); //결제가 성공했으므로 로컬스토리지 장바구니에 담긴 상품 비우기
    localStorage.removeItem("buyItem"); //결제가 성공했으므로 로컬스토리지에 바로구매 상품 비우기
    location.href = "/paid";
    paymentResponse(); //결제 버튼 눌렀을 때 주문을 조회할 수 있도록 api
  } else {
    alert("결제가 성공되지 않으셨습니다");
  }
});

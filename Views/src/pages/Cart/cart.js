const getItems = JSON.parse(localStorage.getItem("cart")) || [];
console.log(getItems);

let totalPrice = 0; //총가격 초기

// 각 fetch 요청을 저장할 배열 만들기.
const fetchPromises = getItems.map(async (item) => {
  const response = await fetch(`/products/${item.id}`);
  return await response.json();
});
console.log(fetchPromises);

// fetch 요청으로 위에서 만든 리절트쪽에 있는 데이터를 프로미스 올로 사용.
Promise.all(fetchPromises).then((productDataArray) => {
  getItems.forEach((item, index) => {

    const data = productDataArray[index]; //각 배열순서에맞는 데이터를 담는다.
    console.log(data.images[0]);

    // 각 상품의 가격을 화면에 표시되는 가격으로 계산하여 더합니다 //처음화면 진입때 더하기함
    let item_su = item.count || 1; //카운트 값이 있으면 넣고 아니면 1을넣느다.
    totalPrice += data.price * item_su;

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
            <button class="minus" data-index="${index}">-</button>
            <input class="item_many" type="text" value="${item_su}" data-index="${index}">
            <button class="plus" data-index="${index}">+</button>
          </td>
          <td><span class="item_total">${total_price()}</span>원</td>
          <td><button class="deleteBtn" data-index="${index}">삭제</button></td>
        </tr>
      `;

    const pageSleeted = document.querySelector("#productTable");
    pageSleeted.innerHTML += MapItem; //html

    // 장바구니 - 제품수량 증가 및 감소
    const plusBtns = document.querySelectorAll(".plus");
    const minusBtns = document.querySelectorAll(".minus");
    const deleteBtns = document.querySelectorAll(".deleteBtn");
    const item_many = document.querySelectorAll(".item_many");
    const item_total = document.querySelectorAll(".item_total");

    plusBtns.forEach((plusBtn, index) => {
      plusBtn.addEventListener("click", (e) => {
        e.preventDefault();
        handlePlusClick(index);
      });
    });
    minusBtns.forEach((minusBtn, index) => {
      minusBtn.addEventListener("click", (e) => {
        e.preventDefault();
        handleMinusClick(index);
      });
    });
    deleteBtns.forEach((deleteBtn, index) => {
      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        handleDeleteClick(index);
      });
    });

    // 삭제 버튼
    const handleDeleteClick = (index) => {
      // 해당 인덱스의 상품 삭제
      getItems.splice(index, 1);

      // 로컬 스토리지에서도 삭제
      localStorage.setItem("cart", JSON.stringify(getItems));

      // 해당 행 삭제
      const tableRow = document.querySelector(
        `#productTable tr[data-index="${index}"]`
      );
      tableRow.parentNode.removeChild(tableRow);
      location.reload();
    };

    // 플러스 버튼
    const handlePlusClick = (index) => {
      // 카운트 증가
      getItems[index].count = (getItems[index].count || 1) + 1;

      // UI 업데이트
      item_su = getItems[index].count;
      item_many[index].value = item_su;
      totalPrice += data.price;
      item_total[index].innerHTML = total_price();
      console.log(item_many[index].value);

      // 로컬 스토리지 업데이트
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

      if (cartItems[index]) {
        // 로컬 스토리지의 카운트 업데이트
        cartItems[index].count = getItems[index].count;
      } else {
        // 로컬 스토리지에 아이템이 없으면 새로 추가
        cartItems[index] = { count: getItems[index].count };
      }

      // 업데이트된 데이터를 로컬 스토리지에 저장
      localStorage.setItem("cart", JSON.stringify(cartItems));
      totalElement();
    };

    // 마이너스 버튼
    const handleMinusClick = (index) => {
      getItems[index].count = (getItems[index].count || 1) - 1;

      // 수량이 1보다 작으면 최소값을 1로 설정
      if (getItems[index].count < 1) {
        getItems[index].count = 1;
      }
      item_su = getItems[index].count;
      totalPrice -= data.price;
      item_many[index].value = item_su;
      item_total[index].innerHTML = total_price();
      console.log(item_many[index].value); //콘솔 확인용

      // 수량 업데이트용 로컬 스토리지에서 데이터 가져오기
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      if (cartItems[index]) {
        cartItems[index].count = item_many[index].value;
        // 로컬 스토리지 업데이트된 데이터 저장
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }
      totalElement();
    };

    const totalElement = () => {
      const totalBox = document.getElementById("totalPrice");
      totalBox.innerHTML = `총 가격: ${totalPrice
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;
    }; // 총 가격을 표시할 위치에 id="totalPrice"인 요소를 추가
    totalElement();

    const paymentBtn = document.querySelector("#payment_btn");
    paymentBtn.addEventListener("click", () => {
      const totalMani = totalPrice
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      localStorage.setItem("totalPrice", totalMani);
    });

    //장바구니 지우기
    const allDeleted = document.querySelector("#cartDelete");
    allDeleted.addEventListener("click", () => {
      window.localStorage.removeItem("cart");
      location.reload();
    });
  });
});

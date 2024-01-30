var swiper = new Swiper(".main_banner", {
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".main_swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".main_swiper-button-next",
    prevEl: ".main_swiper-button-prev",
  },
});

const storedCart = JSON.parse(window.localStorage.getItem("cart") || "[]"); // 가져오기
const cartList = storedCart; //장바구니 리스트

fetch("/products")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    mdItem = data.slice(0, 4); // 처음 4개의 데이터만 선택
    const mdItemMap = mdItem
      .map(
        (item, index) => `
          <td>
          <div class="tb-center">
              <div class="box">
                  <div class="thumb salebox">
                      <a href="/item?id=${item._id}"><img class="MS_prod_img_m" src="${item.images[0]}" alt="상품 섬네일"></a>
                      <div class="info_icon">
                          <span class="cartDateBtnMd" data-value="${item._id}" data-another="${item.price}"><img src="http://skincure.co.kr/design/skincure/0759ansome/icon_prd04.gif" alt="미리보기"></span>                                                                            </div>
                      <input type="hidden" name="custom_price" value="66000">
                      <input type="hidden" name="product_price" value="37000">
                      <div id="sale_bg" style="display: block;"><span class="sale_text">44%</span></div>
                  </div>
                  <ul class="info">
                      <li class="dsc">${item.name}</li>
                      <li class="subname">유기농 미백 보습 에센스!<br>
                      </li><li class="price"><span class="consumer">66,000원</span>${item.price}원</li>
                      <li class="icon"><span class="MK-product-icons"></span></li>
                  </ul>
              </div>
          </div>
          </td>
      `
      )
      .join("");

    const md_md_item = document.querySelector(".main_md_item");
    md_md_item.innerHTML = mdItemMap;

    const cartBtns = document.querySelectorAll(".cartDateBtnMd"); //버튼클래스
    cartBtns.forEach((cartBtn) => {
      const dataValue = cartBtn.dataset.value; //상품의 아이디값
      const dataPrice = cartBtn.getAttribute("data-another"); //상품의 가격 데이터

      cartBtn.addEventListener("click", (e) => {
        if (cartList.some((item) => item.id === dataValue)) {
          //장바구니 스토리지 중복확인.
          alert("이미 장바구니에 있습니다.");
          return;
        } else {
          cartList.push({
            id: dataValue,
            price: dataPrice,
            count: 1,
          }); //상품 아이디를 배열에 넣음
          window.localStorage.setItem("cart", JSON.stringify(cartList)); // 스토리지에 장바구니 아이템넣음.
          alert("장바구니에 넣었습니다.");
        }
      });
    });
  });

fetch("/products")
  .then((response) => response.json())
  .then((data) => {
    itemList = data;
    const itemListSet = itemList
      .map(
        (item, index) => `
  <div class="prd-list">
  <table summary="상품이미지, 상품 설명, 가격">
  <tbody>
  <tr>
  <td>
  <div class="tb-center">
      <div class="box">
          <div class="thumb salebox">
              <a href="/item?id=${item._id}"><img class="MS_prod_img_m" src="${item.images[0]}" alt="상품 섬네일"></a>
              <div class="info_icon">
                  <span><a class="cartDateBtn" data-value="${item._id}" data-another="${item.price}"><img src="http://skincure.co.kr/design/skincure/0759ansome/icon_prd04.gif" alt="미리보기"></a></span>                                                                            </div>
              <input type="hidden" name="custom_price" value="0">
              <input type="hidden" name="product_price" value="24000">
              <div id="sale_bg" style="display: none;"><span class="sale_text"></span></div>
          </div>
          <ul class="info">
              <li class="dsc">${item.name}<br></li>
              <li class="price">${item.price}원</li>
              <li class="icon"><span class="MK-product-icons"></span></li>
          </ul>
      </div>
  </div>
  </tbody>
  </table>
  </div>
`
      )
      .join("");

    const allItem = document.querySelector(".swiper2_tabbox01");
    allItem.innerHTML = itemListSet;

    const cartBtns = document.querySelectorAll(".cartDateBtn");
    cartBtns.forEach((cartBtn) => {
      const dataValue = cartBtn.dataset.value;
      const dataPrice = cartBtn.getAttribute("data-another");
      cartBtn.addEventListener("click", (e) => {
        if (cartList.some((item) => item.id === dataValue)) {
          alert("이미 장바구니에 있습니다.");
          return;
        } else {
          cartList.push({
            id: dataValue,
            price: dataPrice,
            count: 1,
          }); //상품 아이디를 배열에 넣음
          window.localStorage.setItem("cart", JSON.stringify(cartList));
          alert("장바구니에 넣었습니다.");
        }
      });
    });
  });

const categoryNav = document.querySelector(".list");

let linkName = [];
// 카테고리 데이터로 불러와서 만들기.
async function fetchData() {
  try {
    const storedCart = JSON.parse(window.localStorage.getItem("cart") || "[]"); // 가져오기
    const response = await fetch("/category");
    const data = await response.json();
    console.log(data);

    const category_item_nav = data
      .map(
        (item, index) => `
      <li><a href="" class="linkName" data-name="${item.name}">${item.name}</a></li>
    `
      )
      .join("");
    categoryNav.innerHTML = category_item_nav;
    const linkBtns = document.querySelectorAll(".linkName");

    linkBtns.forEach((linkBtn) => {
      linkBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const dataNameValue = linkBtn.getAttribute("data-name");

        linkName = [];
        linkName.push(dataNameValue);

        listHtml(linkName);
        cartB();
      });
    });
    const cartB = () => {
      setTimeout(() => {
        const cartBtns = document.querySelectorAll(".cartDateBtnMd"); //버튼클래스
        const cartList = storedCart; //장바구니 리스트
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
      }, 100);
    };
    cartB();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
fetchData().then(() => {
  // fetchData가 완료된 후 listHtml 호출
  listHtml(linkName);
});

// const koreanText = '스킨'; // 여기에 실제로 사용하려는 한글 텍스트를 넣어주세요
// fetch(`/category/products/${koreanText}`).then((response) => response.json()).then((data)=>console.log(data))

const listHtml = async (link) => {
  console.log(link);
  const encodedLink = encodeURIComponent(link);
  let notLink;

  if (link) {
    notLink = fetch(`/category/products/${encodedLink}`);
  } else {
    notLink = fetch(`/category/products/스킨`);
  }

  const response = await notLink;
  const items = await response.json();
  console.log(items);
  // 상품 템플릿화
  function createProductTemplate(imageSrc, title, price, id) {
    const productTemplate = `
          <div class="product">
            <div class="product-image">
              <a href="/item?id=${id}">
                <img src="${imageSrc}" alt="상품 섬네일">
              </a>
              <div class="info_icon">
                <span class="cartDateBtnMd" data-value="${id}" data-another="${price}"><img src="http://skincure.co.kr/design/skincure/0759ansome/icon_prd04.gif" alt="미리보기"></span>
              </div>
            </div>
            <div class="product-info">
              <div class="product-title">${title}</div>
              <div class="product-price">
                <span>${price} 원</span>
              </div>
            </div>
          </div>
        `;

    return productTemplate;
  }
  // 동적 상품 추가
  const productContainer = document.querySelector(".product-container");
  // 반복해서 상품을 추가
  productContainer.innerHTML = "";
  items.forEach((item) => {
    const productElement = createProductTemplate(
      item.images[0],
      item.name,
      item.price,
      item._id
    );
    productContainer.innerHTML += productElement;
  });
};

listHtml();

document.addEventListener("DOMContentLoaded", function () {
  const liElements = document.querySelectorAll(
    "#productClass .cate-wrap .class-list ul li"
  );

  liElements.forEach(function (li) {
    li.addEventListener("mouseover", function () {
      // 마우스 호버 시 배경색과 테두리 색 변경
      li.classList.add("active");
    });

    li.addEventListener("mouseout", function () {
      // 마우스가 빠져나가면 배경색과 테두리 색을 제거하여 원래대로 돌립니다.
      li.classList.remove("active");
    });
  });
});

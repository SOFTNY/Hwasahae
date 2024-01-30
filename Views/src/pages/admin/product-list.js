// 상품 테이블
const products_table = document.querySelector(".align-items-top");

window.onload = function () {
  console.log("상품 관리 페이지");

  var req_orders = {
    method: "GET",
    redirect: "follow",
  };

  //상품조회
  fetch("/products", req_orders)
    .then((response) => response.json())
    .then((result) => {
      console.log("통신 성공!", result);
      products_table.innerHTML = createProductsList(result);
    })
    .catch((error) => {
      console.log("error가 발생했어요!", error);
    });

  const createProductsList = (data) => {
    return data.reduce(
      (prev, cur) =>
        prev +
        `
  <div class="col-lg-3" style="cursor:pointer" >
    <div class="card" id=${cur["_id"]}>
      <img src="${
        cur["images"][0]
      } " class="card-img-top" alt="..." style="aspect-ratio:16/12">
      <div class="card-body">
        <h5 class="card-title">${cur["name"]}</h5>
        <p class="card-text">${cur["price"]?.toLocaleString()}원</p>
         <p class="card-text"><a href="#" class="btn btn-primary">상세보기</a></p>
      </div>
    </div>
  </div>
  `,
      ""
    );
  };

  //상품상세페이지로 이동
  products_table.addEventListener("click", (event) => {
    const target = event.target;
    const parent = target.closest(".card");
    if (parent.getAttribute("class") === "card") {
      const productid = parent.getAttribute("id");
      location.href = `/admin/product?id=${productid}`;
    }
  });
};

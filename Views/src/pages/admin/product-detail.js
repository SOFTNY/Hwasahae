window.onload = function () {
  console.log("상품 상세 페이지");

  const form = document.querySelector("#detailForm");
  const editBtn = document.querySelector("#edit");
  const urlSearch = new URLSearchParams(location.search);
  const productId = urlSearch.get("id");

  var req_orders = {
    method: "GET",
    redirect: "follow",
  };

  //상품 조회
  fetch(`/products/${productId}`, req_orders)
    .then((response) => response.json())
    .then((result) => {
      console.log("통신 성공!", result);

      form.name.value = result.name;
      const number = Number(result.price);
      form.price.value = number;
      form.maker.value = result.maker;
      form.description.value = result.description;

      // 카테고리 세팅
      const categoryOption = document.createElement("option");
      categoryOption.value = result?.category;
      categoryOption.innerHTML = result?.category;
      form.category.append(categoryOption);

      //이미지 설정
      const imgBox = document.querySelector(".card-img-top");
      imgBox.src = result?.images[0];
    })
    .catch((error) => {
      console.log("error가 발생했어요!", error);
      alert(`에러메시지 : ${error.message}`);
    });

  // 수정버튼 누르면
  editBtn.addEventListener("click", () => {
    location.href = `/admin/product/edit?id=${productId}`;
  });

  //상품 삭제
  const deleteProduct = async (e) => {
    e.preventDefault();

    const confirm = window.confirm("정말로 상품을 삭제하시겠습니까?");

    if (!confirm) return;

    const product_delete_URL = `/admin/${productId}/product`;

    const option = {
      method: "DELETE",
    };

    await fetch(product_delete_URL, option)
      .then((res) => res.json())
      .then((res) => {
        alert("상품이 성공적으로 삭제되었습니다.");
        location.href = `/admin//product-list.html`;
        if (res?.result === "fail") {
          alert(`에러메시지 : ${res.error}`);
        }
      })
      .catch((err) => {
        console.log(" err: ", err);
        alert(`에러메시지 : ${err.error}`);
      });
  };

  const deleteEvent = () => {
    const productDeleteButton = document.querySelector("#delete");
    productDeleteButton.addEventListener("click", deleteProduct);
  };

  deleteEvent();
};

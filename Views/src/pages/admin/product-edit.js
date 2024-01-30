window.onload = function () {
  console.log("상품 수정 페이지");

  const categoryOptions = document.querySelector(".form-select");
  const urlSearch = new URLSearchParams(location.search);
  const productId = urlSearch.get("id");

  var req_orders = {
    method: "GET",
    redirect: "follow",
  };

  //카테고리 조회
  fetch("/category", req_orders)
    .then((response) => response.json())
    .then((result) => {
      console.log("통신 성공!", result);
      categoryOptions.innerHTML = createCategoryList(result);
    })
    .catch((error) => {
      console.log("error가 발생했어요!", error);
      alert(`에러메시지 : ${error.message}`);
    });

  const createCategoryList = (data) => {
    return data.reduce(
      (prev, cur) =>
        prev +
        `
        <option value=${cur["name"]}>${cur["name"]}</option>
    `,
      ""
    );
  };

  //상품 정보 가져오기
  fetch(`/products/${productId}`, { method: "GET" })
    .then((response) => response.json())
    .then((result) => {
      console.log("통신 성공!", result);

      const form = document.querySelector("#detailForm");
      form.name.value = result.name;
      const number = Number(result.price);
      form.price.value = number;
      form.maker.value = result.maker;
      form.description.value = result.description;
      // 카테고리 선택
      for (let i = 0; i < categoryOptions.length; i++) {
        if (categoryOptions[i].value === result?.category)
          categoryOptions[i].selected = true;
      }
    })
    .catch((error) => {
      console.log("error가 발생했어요!", error);
      alert(`에러메시지 : ${error.message}`);
    });

  //상품 수정
  const editProduct = async (e) => {
    e.preventDefault();
    const input = document.querySelectorAll("input[required]");

    // 유효성 검증
    for (let i = 0; i < input.length; i++) {
      if (input[i].value === "") return alert("필수 입력사항을 채워주세요.");
    }

    const form = document.querySelector("#detailForm");
    const formData = new FormData(form);

    const product_add_URL = `/admin/${productId}/product`;

    const option = {
      method: "PATCH",
      body: formData,
    };

    await fetch(product_add_URL, {
      ...option,
    })
      .then((res) => res.json())
      .then((res) => {
        alert("상품이 성공적으로 수정되었습니다.");
        location.href = `/admin/product?id=${res?._id}`;
        if (res?.result === "fail") {
          alert(`에러메시지 : ${res.error}`);
        }
      })
      .catch((err) => {
        console.log(" err: ", err);
        alert(`에러메시지 : ${err.error}`);
      });
  };

  const editEvent = () => {
    const productEditButton = document.querySelector("#edit");
    productEditButton.addEventListener("click", editProduct);
  };

  editEvent();
};

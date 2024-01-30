const categoryOptions = document.querySelector(".form-select");

window.onload = function () {
  console.log("상품 추가 페이지");

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
        <option selected>${cur["name"]}</option>
    `,
      ""
    );
  };

  //상품추가
  const addProduct = async (e) => {
    e.preventDefault();
    const input = document.querySelectorAll("input[required]");

    // 유효성 검증
    for (let i = 0; i < input.length; i++) {
      if (input[i].value === "") return alert("필수 입력사항을 채워주세요.");
    }
    const form = document.querySelector("#addForm");

    const product_add_URL = "/admin/product";

    const formData = new FormData(form);

    const option = {
      method: "POST",
      body: formData,
    };

    await fetch(product_add_URL, {
      ...option,
    })
      .then((res) => res.json())
      .then((res) => {
        alert("상품이 성공적으로 등록되었습니다.");
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

  const addEvent = () => {
    const productAddButton = document.querySelector("#add");
    productAddButton.addEventListener("click", addProduct);
  };

  addEvent();
  //   function sendToServer() {
  //     //기본정보 작성 안되어 있을 시 튕겨내기
  //     if ($(".cmode1").val() == "") {
  //       alert("상품 분류를 선택해주세요");
  //       return false;
  //     }
  //     if ($("input[name=item_name]").val() == "") {
  //       alert("상품명을 입력해주세요");
  //       return false;
  //     }
  //     if ($("input[name=price]").val() == "") {
  //       alert("판매가격을 입력해주세요");
  //       return false;
  //     }
  //     if ($("input[type=file]").val() == "") {
  //       alert("파일 이미지를 업로드해주세요");
  //       return false;
  //     }
  //   }
};

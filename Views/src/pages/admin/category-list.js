window.onload = function () {
  console.log("카테고리 관리 페이지");

  // 카테고리테이블
  const categoryTable = document.querySelector(".row");

  // 카테고리 리스트 불러오기
  const setAddCategory = () => {
    var requestOptions = {
      method: "GET",
    };

    fetch("/category", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("통신 성공! 이건 카테고리", result);
        categoryTable.innerHTML = createCategoryList(result);
      })
      .catch((error) => {
        console.log("error가 발생했어요!", error),
          (categoryTable.innerHTML = `
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">오류가 나타났어요🧐</h5>
              </div>
            </div>
            `);
      });
  };

  const createCategoryList = (data) => {
    return data.reduce(
      (prev, cur) =>
        prev +
        `
        <div class="col-lg-3">
            <div class="card" id="${cur["_id"]}" value="${cur.name}">
              <div class="card-body">
                <h5 class="card-title">${cur.name}</h5>
                <button type="button" class="btn btn-success edit" id="category_modi">수정</button>
                <button type="button" class="btn btn-danger delete" id="category_del">삭제</button>
              </div>
            </div>
         </div>
    `,
      ""
    );
  };

  setAddCategory();

  //카테고리상세페이지로 이동
  categoryTable.addEventListener("click", (event) => {
    const target = event.target;
    const categoryId = event.target.closest(".card").id;
    const categoryName = event.target.closest(".card").getAttribute("value");
    if (target.classList.contains("edit")) {
      location.href = `category-modify.html?id=${categoryId}&categoryName=${categoryName}`;
    }

    if (target.classList.contains("delete")) {
      deleteCategory(categoryId);
    }
  });

  //카테고리 추가
  const addbtn = document.querySelector("#category_add");

  addbtn.addEventListener("click", function () {
    const url = "/admin/category";
    const categoryNewName = document.querySelector("#categoryNewName");
    if (categoryNewName.value === "")
      return alert("카테고리 이름을 입력해주세요.");

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: categoryNewName.value }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("성공적으로 카테고리가 등록되었습니다.");
        location.reload();
      })
      .catch((err) => alert(err.error));
  });

  //카테고리 삭제
  const deleteCategory = (id) => {
    const userSignal = window.confirm("해당 카테고리를 정말 삭제하시겠습니까?");
    if (userSignal) {
      var requestOptions = {
        method: "DELETE",
      };

      fetch(`/admin/${id}/category`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          alert("성공적으로 카테고리가 삭제되었습니다.");
          location.reload();
        })
        .catch((err) => alert(err.error));
    }
  };
};

window.onload = function () {
  const urlSearch = new URLSearchParams(location.search);
  const categoryId = urlSearch.get("id");
  const categoryName = urlSearch.get("categoryName");

  const categorychild = document.getElementById("categorychild");
  categorychild.value = categoryName;

  const postModifiedCategory = () => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newName: categorychild?.value }),
    };

    fetch(`/admin/${categoryId}/category`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        location.href = `/admin/category-list.html`;
      })
      .catch((error) => console.log("error", error));
  };
  const editBtn = document.querySelector("#category_modi_finish");
  editBtn.addEventListener("click", postModifiedCategory);
};

window.onload = function () {
  console.log("주문 수정 페이지");

  const form = document.querySelector("#orderForm");
  const urlSearch = new URLSearchParams(location.search);
  const orderId = urlSearch.get("orderNo");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  // 날짜 변환 함수
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("ko-KR", { hour12: true }); // 12시간제로 표시
  };
  // 번호 형식 변환 함수
  const formatPhoneNumber = (phoneNumber) => {
    // 숫자만 추출
    const digits = phoneNumber.replace(/\D/g, "");
    // 정규 표현식을 사용하여 형식 지정
    const match = digits.match(/^(\d{2,3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };
  const formatCurrency = (amount) => {
    return amount.toLocaleString("ko-KR");
  };

  //상품 조회
  fetch(`/admin/${orderId}/order`, requestOptions)
    .then((response) => response.json())
    .then((cur) => {
      // 수정: result 대신 cur을 사용
      console.log("통신 성공!", cur);

      const formattedDate = formatDate(cur.createdAt); // 변환된 날짜
      const userName = cur.userId.name; // 사용자 이름
      const formattedPhone = formatPhoneNumber(cur["receiver"].phone); // 번호 - 추가
      const formattedTotalPrice = formatCurrency(cur.totalPrice); // 단위별 , 추가

      form.formattedDate.value = formattedDate;
      form.userName.value = userName;
      form.formattedPhone.value = formattedPhone;
      form.price.value = formattedTotalPrice;
      form.address.value = cur["receiver"].address;
      form.status.value = cur.status;
    })
    .catch((error) => {
      console.log("error가 발생했어요!", error);
      alert(`에러메시지 : ${error.message}`);
    });

  //상품 수정
  const editOrder = async (e) => {
    e.preventDefault();
    const input = document.querySelectorAll("input[required]");

    // 유효성 검증
    for (let i = 0; i < input.length; i++) {
      if (input[i].value === "") return alert("필수 입력사항을 채워주세요.");
    }

    // 수정: form 변수가 중복되므로 formDataForm으로 변경
    const formDataForm = document.querySelector("#orderForm");
    const formData = new FormData(formDataForm); // 수정: form 대신 formDataForm을 사용

    const order_add_URL = `/admin/${orderId}/order`;

    const option = {
      method: "PATCH",
      body: formData,
    };

    await fetch(order_add_URL, {
      option,
    })
      .then((res) => res.json())
      .then((res) => {
        alert("주문이 성공적으로 수정되었습니다.");
        location.href = `/admin/order?id=${res?._id ?? ""}`;
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
    const orderEditButton = document.querySelector("#modify");
    orderEditButton.addEventListener("click", editOrder);
  };

  editEvent();

  //주문 삭제
  const OrderProduct = async (e) => {
    e.preventDefault();

    const confirm = window.confirm("정말로 주문을 삭제하시겠습니까?");

    if (!confirm) return;

    const order_delete_URL = `/admin/${orderId}/order`;

    const option = {
      method: "DELETE",
    };

    await fetch(order_delete_URL, option)
      .then((res) => res.json())
      .then((res) => {
        alert("상품이 성공적으로 삭제되었습니다.");
        location.href = `/admin//order-manage.html`;
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
    const orderDeleteButton = document.querySelector("#delete");
    orderDeleteButton.addEventListener("click", OrderProduct);
  };

  deleteEvent();
};

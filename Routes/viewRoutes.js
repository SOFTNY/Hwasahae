const express = require("express");
const path = require("path");
const router = express.Router();

//load css, js, asset
router.use("/", express.static("Views"));
router.use("/", express.static("Views/src"));
router.use("/admin", express.static("Views/src/pages/admin/"));

//route setting
router.use("/", express.static("Views/src/pages/Main"));
router.use("/item", express.static("Views/src/pages/ItemPage"));

router.use("/login", express.static("Views/src/pages/SignIn")); //로그인
router.use("/find", express.static("Views/src/pages/Find_idPw")); //아이디/비번 찾기
router.use("/register", express.static("Views/src/pages/SIgnUp")); //회원가입
router.use(
  "/registerOk",
  express.static("Views/src/pages/SIgnUp/success_signUp/success_signUp.html")
); //회원가입 성공
router.use("/payment", express.static("Views/src/pages/Payment")); //결제
router.use(
  "/paid",
  express.static("Views/src/pages/Payment/success_payment/success_payment.html")
); //결제완료
router.use("/cart", express.static("Views/src/pages/Cart")); //장바구니
router.use("/product", express.static("Views/src/pages/Product"));
router.use("/mypage", express.static("Views/src/pages/Mypage"));

// 관리자
router.use("/admin", express.static("Views/src/pages/admin"));
//상품추가
router.use(
  "/admin/product/add",
  express.static("Views/src/pages/admin/product-add.html")
);
//상품상세
router.use(
  "/admin/product",
  express.static("Views/src/pages/admin/product-detail.html")
);

//마이페이지-회원정보수정
router.use(
  "/users/mypage/edit",
  express.static("Views/src/pages/Mypage/member/edit.html")
);

//마이페이지-회원탈퇴
router.use(
  "/users/mypage/edit",
  express.static("Views/src/pages/Mypage/member/withdraw.html")
);

//마이페이지-주문상세
router.use(
  "/users/mypage/order",
  express.static("ViewssrcpagesMypageorderorder.html")
);

//상품수정
router.use(
  "/admin/product/edit",
  express.static("Views/src/pages/admin/product-edit.html")
);

//주문수정
router.use(
  "/admin/order/edit",
  express.static("Views/sre/pages/admin/order-modify.html")
);

module.exports = router;

const express = require("express");
const {
  createCategoryAdmin,
  updateCategoryAdmin,
  deleteCategoryAdmin,
  getOrderAdmin,
  updateOrderAdmin,
  listOrderAdmin,
  deleteOrderAdmin,
  createProductAdmin,
  modifyProductsAdmin,
  deleteProductsAdmin,
} = require("../Controllers/adminController");
const authJWT = require("../utils/authJWT");
const router = express.Router();

const multer = require("multer");
const path = require("path");

// 카테고리
router.post("/category", authJWT, createCategoryAdmin); // 카테고리 추가 (관리자)
router.patch("/:categoryId/category", authJWT, updateCategoryAdmin); // 카테고리 수정 (관리자)
router.delete("/:categoryId/category", authJWT, deleteCategoryAdmin); // 카테고리 삭제 (관리자)

// 주문
router.get("/order", authJWT, listOrderAdmin); // 주문 조회 (관리자)
router.get("/:orderId/order", authJWT, getOrderAdmin); // 특정 주문 조회 (관리자)
router.patch("/:orderId/order", authJWT, updateOrderAdmin); // 주문 수정 (관리자)
router.delete("/:orderId/order", authJWT, deleteOrderAdmin); // 주문 삭제 (관리자)

// 상품 이미지
// 파일 저장 위치와 파일명 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Views/src/pages/Product/img/shopimages"); // 폴더에 파일을 저장합니다.
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // 파일 이름을 현재 날짜와 원본 파일의 확장자로 저장합니다.
  },
});

// 파일 필터링 (이미지만 허용)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("이미지 파일만 업로드 가능합니다."), false);
  }
};

// 파일 업로드 미들웨어 설정
const upload = multer({ storage: storage, fileFilter: fileFilter });
// 상품
router.post("/product", upload.single("image"), authJWT, createProductAdmin); // 상품 추가 (관리자)
router.patch(
  "/:productId/product",
  upload.single("image"),
  authJWT,
  modifyProductsAdmin
); // 상품 수정 (관리자)
router.delete("/:productId/product", authJWT, deleteProductsAdmin); // 상품 삭제 (관리자)

module.exports = router;

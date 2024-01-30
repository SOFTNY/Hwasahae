const express = require("express");

const {
  listProducts,
  detailProducts,
} = require("../Controllers/productController");

const router = express.Router();

// 상품
router.get("/", listProducts); // 모든 상품 조회 (유저)
router.get("/:productId", detailProducts); // 특정 상품 조회 (유저)
module.exports = router;

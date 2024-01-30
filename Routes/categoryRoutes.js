const express = require("express");
const {
  getCategory,
  getProductsByCategoryName,
} = require("../Controllers/categoryController");
const router = express.Router();

// 카테고리
router.get("/", getCategory); // 모든 카테고리 조회 (유저)
router.get("/products/:categoryName", getProductsByCategoryName); // 특정 카테고리 조회
module.exports = router;

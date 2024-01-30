const ProductService = require("../Services/ProductService");
const asyncHandler = require("../utils/asyncHandler");

const ProductServiceInstance = new ProductService();

// 모든 상품 목록 조회 (유저)
const listProducts = asyncHandler(async (req, res) => {
  const products = await ProductServiceInstance.listProducts();
  res.status(200).json(products); // 조회된 상품들을 JSON 형태로 반환합니다.
});
// 특정 상품 목록 조회 (유저)
const detailProducts = asyncHandler(async (req, res) => {
  const product = await ProductServiceInstance.detailProduct(
    req.params.productId
  );
  res.status(200).json(product);
});

module.exports = {
  listProducts,
  detailProducts,
};

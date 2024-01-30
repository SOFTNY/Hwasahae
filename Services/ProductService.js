const { Product } = require("../Models");

class ProductService {
  constructor() {}
  // 모든 상품 목록 조회 메소드 (유저)
  async listProducts() {
    const products = await Product.find({ deletedAt: null })
      .populate("category")
      .sort({ createdAt: -1 }); // 카테고리 정보를 포함하여 모든 상품을 조회합니다.
    return products; // 조회된 상품들을 반환합니다.
  }

  // 특정 상품 목록 조회 메소드 (유저)
  async detailProduct(productId) {
    const product = await Product.findOne({
      _id: productId,
      deletedAt: null,
    }).populate("category"); // 특정 상품을 조회합니다.
    if (!product) {
      throw new Error("해당 상품을 찾을 수 없습니다.");
    }
    return product; // 조회된 상품을 반환합니다.
  }
}
module.exports = ProductService;

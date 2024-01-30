// CategoryService.js
const { Category, Product } = require("../Models");

class CategoryService {
  constructor() {}

  // 모든 카테고리 목록 조회 메소드(유저)
  async getCategories() {
    const categories = await Category.find({});
    return categories;
  }
  // 특정 카테고리 목록 조회 메소드 (유저)
  async getProductsByCategoryName(categoryName) {
    const products = await Product.find({
      category: categoryName,
      deletedAt: null,
    });
    return products;
    // const category = await Category.findOne({ name: categoryName });
    // if (!category) {
    //   throw new Error(`Cannot find category: ${categoryName}`);
    // }
    // const products = await Product.find({ category: category._id }).populate(
    //   "category"
    // );
    // return products;
  }
}

module.exports = CategoryService;

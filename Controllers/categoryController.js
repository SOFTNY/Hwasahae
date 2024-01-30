const CategoryService = require("../Services/CategoryService");
const asyncHandler = require("../utils/asyncHandler");

const categoryService = new CategoryService();

// 모든 카테고리 목록 조회 (유저)
const getCategory = asyncHandler(async (req, res) => {
  const categories = await categoryService.getCategories();
  res.status(200).json(categories);
});
// 특정 카테고리 목록 조회 (유저)
const getProductsByCategoryName = asyncHandler(async (req, res) => {
  const { categoryName } = req.params;
  console.log(categoryName);
  const category = await categoryService.getProductsByCategoryName(
    categoryName
  );
  res.status(200).json(category);
});

module.exports = {
  getCategory,
  getProductsByCategoryName,
};

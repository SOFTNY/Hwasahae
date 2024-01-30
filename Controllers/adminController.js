const AdminService = require("../Services/AdminService");
const asyncHandler = require("../utils/asyncHandler");

const categoryService = new AdminService();
const orderService = new AdminService();
const ProductService = new AdminService();

// category
// 카테고리 추가 (관리자)
const createCategoryAdmin = asyncHandler(async (req, res) => {
  const { name } = req.body;
  console.log("name : ", req);
  const userRole = res.locals.userInfo.role;
  const result = await categoryService.createCategory(name, userRole);
  res.status(200).json(result);
});
// 카테고리 수정
const updateCategoryAdmin = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { newName } = req.body;
  console.log("categoryId : ", categoryId);
  console.log("req.body : ", req.body);
  const userRole = res.locals.userInfo.role;
  const updatedCategory = await categoryService.updateCategory(
    categoryId,
    newName,
    userRole
  );
  res.status(200).json({
    message: "카테고리가 수정되었습니다.",
    category: updatedCategory,
  });
});
// 카테고리 삭제
const deleteCategoryAdmin = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const userRole = res.locals.userInfo.role;
  await categoryService.deleteCategory(categoryId, userRole);
  res.status(200).json({ message: "카테고리가 삭제되었습니다." });
});

// order
// 전체 주문 조회 (관리자)
const listOrderAdmin = asyncHandler(async (req, res) => {
  const orders = await orderService.listOrderAdmin();
  res.status(200).json(orders);
});
// 특정 주문 조회 (관리자)
const getOrderAdmin = asyncHandler(async (req, res) => {
  const { orderId } = req.params; // URL에서 orderId를 추출합니다.
  const order = await orderService.getOrderAdmin(orderId);
  res.status(200).json(order); // 주문 정보를 응답으로 반환합니다.
});

// 주문 수정 (관리자)
const updateOrderAdmin = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const userRole = res.locals.userInfo.role;
  const updatedOrder = await orderService.updateOrderAdmin(
    orderId,
    status,
    userRole
  );

  res.status(200).json({
    message: "주문 상태가 업데이트 되었습니다.",
    order: updatedOrder,
  });
});
// 주문 삭제 (관리자)
const deleteOrderAdmin = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const userRole = res.locals.userInfo.role;
  await orderService.deleteOrderAdmin(orderId, userRole);
  res.status(200).json({ message: "주문이 삭제되었습니다." });
});

// product
// 상품 추가 (관리자)
const createProductAdmin = asyncHandler(async (req, res) => {
  const userRole = res.locals.userInfo.role;
  const product = await ProductService.createProduct(
    req.body,
    req.file,
    userRole
  );
  res.status(200).json(product);
});
// 상품 정보 수정 (관리자)
const modifyProductsAdmin = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userRole = res.locals.userInfo.role;
  const updateData = req.body; // 수정할 정보를 담은 객체
  const updatedProduct = await ProductService.modifyProduct(
    productId,
    updateData,
    req.file,
    userRole
  );
  res.status(200).json(updatedProduct);
});
// 상품 삭제 (관리자)
const deleteProductsAdmin = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userRole = res.locals.userInfo.role;
  const deletedProduct = await ProductService.deleteProduct(
    productId,
    userRole
  );
  res.json({
    message: "상품이 성공적으로 삭제되었습니다.",
    product: deletedProduct,
  });
});

module.exports = {
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
};

const { Category, Order, Product } = require("../Models");

class AdminService {
  constructor() {}

  // category
  // 카테고리 추가 메소드(관리자)
  async createCategory(name, role) {
    const newCategory = new Category({ name });
    const result = await newCategory.save();
    return result;
  }
  // 카테고리 수정 메소드 (관리자)
  async updateCategory(categoryId, newName, role) {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name: newName },
      { new: true } // 이 옵션은 업데이트된 문서를 반환하도록 설정합니다.
    );
    console.log("updatedCategory : ", updatedCategory);
    if (!updatedCategory) {
      throw new Error("해당 카테고리를 찾을 수 없습니다.");
    }

    return updatedCategory;
  }
  // 카테고리 삭제 메소드 (관리자)
  async deleteCategory(categoryId, role) {
    const deletedCategory = await Category.findByIdAndRemove(categoryId);

    if (!deletedCategory) {
      throw new Error("해당 카테고리를 찾을 수 없습니다.");
    }

    return deletedCategory;
  }

  // order
  // 주문 전체 조회 메소드 (관리자)
  async listOrderAdmin() {
    const orders = await Order.find({})
      .populate("userId", "name") // userId로부터 name 필드만 가져옴
      .exec();
    return orders;
  }
  // 특정 주문 조회 메소드 (관리자)
  async getOrderAdmin(orderId) {
    const order = await Order.findById(orderId)
      .populate("userId") // 유저 정보를 포함합니다.
      .populate("orderedItems.product") // 상품 정보를 포함합니다.
      .exec();
    if (!order) {
      throw new Error("해당하는 주문을 찾을 수 없습니다."); // 주문이 없을 경우 오류를 던집니다.
    }
    return order;
  }

  // 주문 수정 메소드 (관리자)
  async updateOrderAdmin(orderId, newStatus, role) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("주문을 찾을 수 없습니다.");
    }
    // 주문 상태가 '배송중'이거나 '배송 완료'인 경우, 상태 변경 불가
    if (
      (order.status === "배송중" || order.status === "배송 완료") &&
      newStatus !== order.status
    ) {
      throw new Error(
        "배송중이거나 배송 완료된 주문의 상태를 변경할 수 없습니다."
      );
    }

    order.status = newStatus;
    await order.save();
    return order;
  }
  // 주문 삭제 메소드 (관리자)
  async deleteOrderAdmin(orderId, role) {
    const result = await Order.deleteOne({ _id: orderId });
    if (result.deletedCount === 0) {
      throw new Error("주문을 찾을 수 없습니다.");
    }
    return result;
  }

  // product
  // 상품 추가 메소드 (관리자)
  async createProduct(productDTO, file) {
    const { name, description, price, maker, category } = productDTO;

    const imagePath = file ? `/img/shopimages/${file.filename}` : null;
    // 카테고리가 이미 존재하는지 확인
    let categoryDoc = await Category.findOne({ name: category });

    // 존재하지 않으면 에러 생성
    if (!categoryDoc) {
      const error = new Error("해당 카테고리가 존재하지 않습니다.");
      error.status = 400;
      throw error;
    }

    // 새 상품 문서 생성
    const newProduct = new Product({
      name,
      images: imagePath ? [imagePath] : [], // 웹 URL 이미지 경로 배열
      description,
      price,
      maker,
      category,
    });

    // 상품 저장
    const savedProduct = await newProduct.save();
    return savedProduct;
  }

  // 상품 정보 수정 메소드 (관리자)
  async modifyProduct(productId, updateData, file, role) {
    const imagePath = file ? `/img/shopimages/${file.filename}` : null;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { ...updateData, images: imagePath ? [imagePath] : [] },
      { new: true }
    );

    if (!updatedProduct) {
      throw new Error("상품을 찾을 수 없습니다.");
    }
    return updatedProduct;
  }

  // 상품 정보 삭제 메소드 (관리자)
  async deleteProduct(productId, role) {
    const productExists = await Product.findById(productId);
    if (!productExists) {
      throw new Error("삭제할 상품을 찾을 수 없습니다.");
    }

    const currentDate = new Date();
    const delProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { deletedAt: currentDate },
      { new: true }
    );

    if (!delProduct) {
      throw new Error("상품 삭제 처리 중 오류가 발생했습니다.");
    }
    return delProduct;
  }
}
module.exports = AdminService;

const { Order, User } = require("../Models");

class OrderService {
  constructor() {}
  // 주문 추가 메소드 (유저)
  async createOrder(orderDTO, userInfo) {
    const { userId, receiver, orderedItems, deliveryFee, status } = orderDTO;
    //const user = res.locals.userInfo;
    // totalPrice 계산: 각 상품의 가격과 수량을 곱한 후 총합에 배송비를 더합니다.
    let totalPrice =
      orderedItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
      deliveryFee;

    const newOrder = new Order({
      userId,
      receiver,
      orderedItems,
      deliveryFee,
      totalPrice,
      status,
    });

    const savedOrder = await newOrder.save();

    // Populate를 사용하여 상품 정보를 채웁니다.
    const populatedOrder = await Order.findById(savedOrder._id).populate(
      "orderedItems.product"
    );
    //.populate("userId"); // 여기에서 populate 체이닝을 합니다.

    return populatedOrder;
  }

  // 모든 주문 조회 메소드 (유저)
  async listOrder() {
    const orders = await Order.find({})
      //.populate("userId") // 주문한 사용자의 정보를 가져옵니다.
      .populate("orderedItems.product"); // 주문에 포함된 각 상품의 상세 정보를 가져옵니다.
    return orders; // 조회된 상품들을 반환합니다.
  }

  // 주문 취소 메소드 (유저)
  async deleteOrder(orderId) {
    const order = await Order.findById(orderId);

    // 주문이 데이터베이스에 존재하지 않는 경우
    if (!order) {
      const error = new Error("주문을 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }
    // 주문이 이미 취소된 경우
    if (order.deletedAt) {
      const error = new Error("이미 취소된 주문입니다.");
      error.status = 400;
      throw error;
    }

    order.deletedAt = new Date(); // 현재 날짜를 deletedAt에 저장하여 주문 취소를 표시합니다.
    const result = await order.save();
    return result;
  }

  // 주문 수정 메소드 (유저)
  async updateOrderStatus(orderId, newStatus) {
    const order = await this.findOrderById(orderId);

    if (!order) {
      throw new Error("주문을 찾을 수 없습니다.");
    }

    // 주문 상태가 '배송중'이라면 취소 불가
    if (order.status === "배송중") {
      throw new Error("배송중인 주문은 취소할 수 없습니다.");
    }

    order.status = newStatus;
    await order.save();
    return order;
  }
  async findOrderById(orderId) {
    const order = await Order.findById(orderId);
    return order;
  }
}
module.exports = OrderService;

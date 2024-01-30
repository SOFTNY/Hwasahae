const OrderService = require("../Services/OrderService");
const asyncHandler = require("../utils/asyncHandler");

const orderService = new OrderService();

// 주문 추가 (유저)
const createOrder = asyncHandler(async (req, res) => {
  //인증된 사용자의 _id를 `userId`로 설정합니다.
  const userId = res.locals.userInfo.id; // 금 id -> _id
  const orderData = {
    ...req.body,
    userId, // 인증된 사용자의 _id를 주문의 userId로 설정합니다.
  };
  const populatedOrder = await orderService.createOrder(orderData);
  // const populatedOrder = await orderService.createOrder(req.body);
  res.status(200).json(populatedOrder);
});
// 주문 조회 (유저)
const listOrder = asyncHandler(async (req, res) => {
  const orders = await orderService.listOrder();
  res.status(200).json(orders);
});
// 주문 수정 (유저)
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const updatedOrder = await orderService.updateOrderStatus(orderId, status);
  res.status(200).json(updatedOrder);
});
// 주문 취소 (유저)
const deleteOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const result = await orderService.deleteOrder(orderId);
  // 응답에 주문 취소 메시지 추가
  res.status(200).json({
    message: "주문이 성공적으로 취소되었습니다.",
    order: result,
  });
});
module.exports = {
  createOrder,
  listOrder,
  updateOrderStatus,
  deleteOrder,
};

// orderController 유효성 검사
const validateOrderInput = (req, res, next) => {
  const { userId, receiver, orderedItems, totalPrice, deliveryFee, status } =
    req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId가 누락되었습니다." });
  }
  if (!receiver) {
    return res.status(400).json({ message: "receiver 정보가 누락되었습니다." });
  }
  if (!Array.isArray(orderedItems) || orderedItems.length === 0) {
    return res
      .status(400)
      .json({ message: "orderedItems가 누락되었거나 잘못되었습니다." });
  }
  if (deliveryFee === undefined) {
    return res.status(400).json({ message: "deliveryFee가 누락되었습니다." });
  }
  if (totalPrice === undefined) {
    return res.status(400).json({ message: "totalPrice가 누락되었습니다." });
  }
  if (!status) {
    return res.status(400).json({ message: "status 정보가 누락되었습니다." });
  }

  next();
};

module.exports = {
  validateOrderInput,
};

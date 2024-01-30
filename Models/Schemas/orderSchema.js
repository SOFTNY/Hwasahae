const mongoose = require("mongoose");
const { Schema } = mongoose;

// 주문
const orderSchema = new Schema(
  {
    // 주문한 유저(고객)
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // 수령인
    receiver: {
      name: { type: String, required: true },
      phone: { type: String, required: false }, // Number -> String
      address: { type: String, required: true },
    },
    // 주문 상품들
    orderedItems: [
      {
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    // 배송비 얼마나 드는지
    deliveryFee: { type: Number, required: true, default: 3000 },

    // 유저딴에서 삭제
    deletedAt: { type: Date, required: false },

    // 주문 총 금액
    totalPrice: { type: Number, required: true },

    // 주문 배송 상태 ( 배송준비 중 일때 취소 가능 / 배송중일때 취소 불가능 ) + 정책
    // 주문접수 , 배송 준비중, 배송중, 배송완료
    status: {
      type: String,
      enum: ["주문접수", "배송 준비중", "배송중", "배송 완료"],
      default: "주문접수",
    },
  },
  {
    // 주문 날짜
    timestamps: true,
  }
);

module.exports = orderSchema;

const mongoose = require("mongoose");
const { Schema } = mongoose;

// 상품
const productSchema = new Schema(
  {
    // 상품 이름
    name: { type: String, required: true },

    // 상품 이미지 (여쭙기 경로를 넣을지) - 경로 저장하는게 맞음 (링크를 저장)
    images: { type: Array, required: true },

    // 상품 설명
    description: { type: String, required: false },

    // 상품 가격
    price: { type: Number, required: true },

    // 상품 제조사
    maker: { type: String, required: true },

    // 유저딴에서 삭제
    deletedAt: { type: Date, required: false },

    category: { type: String, required: true },
    // category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  {
    // 생성 날짜
    timestamps: true,
  }
);

module.exports = productSchema;

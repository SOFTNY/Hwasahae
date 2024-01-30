const mongoose = require("mongoose");
const { Schema } = mongoose;

// 카테고리
const categorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = categorySchema;

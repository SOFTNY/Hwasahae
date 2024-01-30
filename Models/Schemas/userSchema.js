const mongoose = require("mongoose");
const { Schema } = mongoose;

// 유저
const userSchema = new Schema(
  {
    // 이름
    name: { type: String, maxlength: 10, required: true },
    // 메일 ( tirm: 공백제거 / unique: 고유한 값)
    email: { type: String, trim: true, required: true, unique: true },

    // 비밀번호
    // 영문대문자, 영문소문자, 숫자, 특수문자 조합으로 이루어진 8~15자의 문자열
    password: { type: String, minlength: 8, required: true },

    //우편번호
    zipcode: { type: String, required: false },

    // 주소(층수가 들어가면 개인정보) - 도로명 주소만은 개인정보x
    address: { type: String, required: false },

    //상세주소 (이것만 암호화 필수X - 상세주소가 들어가면 개인정보로 취급함)
    detailAddress: { type: String, required: false },

    // 유저딴에서 삭제
    deletedAt: { type: Date, required: false },

    // 권한
    role: {
      type: String,
      enum: ["구매자", "판매자", "관리자"],
      default: "구매자",
    },

    refreshToken: { type: String, required: false },

    // 구매자 ref
    order: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  },
  {
    // 생성 날짜
    timestamps: true,
  }
);

module.exports = userSchema;

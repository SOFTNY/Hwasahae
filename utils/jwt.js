const { User } = require("../Models");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET_KEY;

//accessToken 발급
const createAcessToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

//token 검증
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return false;
  }
};

//refreshToken 발급
const createRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, secret, { expiresIn: "14d" });
};

//refreshToken 검증
const verifyRefreshtoken = async (token, refreshDecodedUser) => {
  const user = await User.findById(refreshDecodedUser?.id);
  try {
    if (user?.refreshToken === token) return { result: true, user };
    else return { result: false, user: null };
  } catch (error) {
    return { result: false, user: null };
  }
};

module.exports = {
  createAcessToken,
  verifyToken,
  createRefreshToken,
  verifyRefreshtoken,
};

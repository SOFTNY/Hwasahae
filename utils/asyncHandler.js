//try catch 공통 함수
const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncHandler;

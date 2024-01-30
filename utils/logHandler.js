function logHandler(err, req, res, next) {
  console.log(`[${new Date()}]` + err);
  next(err);
}

module.exports = logHandler;

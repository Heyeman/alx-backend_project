module.exports = (err, req, res, next) => {
  const statusCode = res.status || 500;
  const errMessage = err.message;
  res.status(statusCode).json({
    error: errMessage,
  });
};

const errorHandler = (err, req, res, next) => {
  console.error(err); // log for debugging
  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_ERROR";
  const message = err.message || "Something went wrong";
  res.status(statusCode).json({ error: { code, message } });
};

module.exports = errorHandler;
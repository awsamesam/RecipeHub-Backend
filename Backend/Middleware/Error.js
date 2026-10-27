const NotFound = (req, res, next) => {
  const error = new Error(`NOT Found ${req.originalUrl}`);
  res.status(404);
  next(error);
};
const error = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
module.exports = { NotFound, error };

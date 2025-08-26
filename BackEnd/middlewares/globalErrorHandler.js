const globalErrorHandler = (err, req, res, next) => {
  // status
  const status = err?.status ? err?.status : "failed";
  // message
  const message = err?.message;
  // stack
  const stack = err?.stack;

  res.status(500).json({
    status,
    message,
    stack,
  });
};

// not found handler
const notFond = (req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl} on the server`);
  next(err);
};

module.exports = { globalErrorHandler, notFond };

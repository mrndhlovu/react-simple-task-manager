const errorHandler = (err, req, res, next) => {
  if (typeof err === "string") {
    // custom application error
    return res.status(400).send(err.message);
  }

  if (err.name === "ValidationError") {
    // mongoose validation error
    return res.status(400).send(err.message);
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).send("Invalid Token");
  }

  // default to 500 server error
  return res.status(500).send(err.message);
};

module.exports = errorHandler;

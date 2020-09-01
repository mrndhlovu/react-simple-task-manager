const jwt = require("jsonwebtoken");

const { getSingleUser } = require("../services/user.services");

const { PRIVATE_SIGNATURE } = process.env;

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    const decoded = jwt.verify(token, PRIVATE_SIGNATURE);
    const user = await getSingleUser({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error("Login again to continue!");
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports = { auth };

const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { PRIVATE_SIGNATURE } = require("../utils/config");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    const decoded = jwt.verify(token, PRIVATE_SIGNATURE);
    const user = await User.findOne({
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

const getUser = async (userData) => {
  const user = await User.findOne({
    _id: userData._id,
    email: userData.email,
    confirmationExpires: { $gt: Date.now() },
  });
  return user;
};

module.exports = { auth, getUser };

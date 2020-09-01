const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { ALLOWED_UPDATE_FIELDS_USER } = require("../utils/config");
const { getRandomNumber } = require("../utils/serverUtils");
const { PRIVATE_SIGNATURE } = process.env;
const STRINGS = require("../lang/en");
const User = require("../models/User");

const getUserById = async (id) => {
  return await User.findById(id);
};

const getSingleUser = async (userParams) =>
  await User.findOne({ ...userParams });

const hashString = async (string) => {
  const SALT_FACTOR = 12;

  return await new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_FACTOR, async (err, salt) => {
      bcrypt.hash(string, salt, (error, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
};

const findByCredentials = async ({ email, password }) => {
  if (!email) throw new Error("Email field is required!");
  if (!password) throw new Error("Password field is required!");

  const user = await getSingleUser({ email });
  if (!user) throw new Error("Login error: check your email or password.");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Login error: check your email or password.");

  const token = await getAuthToken(user._id);
  user.tokens = user.tokens.concat({ token });

  await user.save();
  return { user: await populatedUser(user), token };
};

const generateAccessCookie = async (res, token) => {
  await res.cookie("access_token", token, {
    maxAge: 9999999,
    httpOnly: true,
  });
};

const populatedUser = async (user) => {
  await user.populate("tasks").execPopulate();
  await user.populate("lists").execPopulate();

  return { user, tasks: user.tasks, lists: user.lists };
};

const getAuthToken = async (userId) => {
  const KEY_IDENTIFIER = await hashString(`${getRandomNumber(20)}`);

  const token = jwt.sign(
    {
      algorithm: "RS256",
      _id: userId.toString(),
      expiresIn: 3600,
      kid: `kid-${KEY_IDENTIFIER}`,
    },
    PRIVATE_SIGNATURE
  );
  if (!token) throw new Error("Failed to generated access token!");

  return token;
};

const register = async (userParams) => {
  const existingUser = await getSingleUser({ email: userParams.email });

  if (existingUser)
    throw new Error(`User with email ${userParams.email} already exists!`);

  const user = new User({ ...userParams });

  const token = await getAuthToken(user._id);
  user.tokens = user.tokens.concat({ token });

  await user.save();
  return { user: await populatedUser(user), token };
};

const revokeAccess = async (req, res) => {
  if (!req.user._id) throw new Error("User account not found!");
  req.user.tokens = req.user.tokens.filter(
    (token) => token.token !== req.token
  );

  res.clearCookie("access_token");
  await req.user.save();
};

const revokeAllAccessTokens = async (req, res) => {
  if (!req.user._id) throw new Error("User account not found!");
  req.user.tokens = [];
  await req.user.save();
  res.clearCookie("access_token");
};

const deleteAccount = async (req, res) => {
  await req.user.remove();
  res.clearCookie("access_token");
};

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);

  const isValidField = updates.every((update) =>
    ALLOWED_UPDATE_FIELDS_USER.includes(update)
  );

  if (!isValidField) throw new Error(STRINGS.auth.invalidUpdateField);

  updates.forEach((update) => {
    req.user[update] = req.body[update];
  });

  await req.user.save();

  return await populatedUser(req.user);
};

module.exports = {
  deleteAccount,
  findByCredentials,
  generateAccessCookie,
  getAuthToken,
  getSingleUser,
  getUserById,
  hashString,
  populatedUser,
  register,
  revokeAccess,
  revokeAllAccessTokens,
  updateUser,
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const { PRIVATE_SIGNATURE, ROOT_URL } = require("../utils/config");
const { getRandom, tokenExpirationTime } = require("../utils/serverUtils");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, minlength: 4 },
    dateOfBirth: { type: String },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!isEmail(value)) throw new Error("Email provided is invalid!");
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password"))
          throw new Error("Password should not include 'password'!");
      },
    },
    phoneNumber: {
      type: String,
      trim: true,
      validate(value) {
        // TODO validate phone number based on locale
        const numRegex = /^\d{10}$/;
        const validNumber = numRegex.test(value);
        if (!validNumber) throw new Error("Phone number provided is invalid!");
      },
    },
    registrationSource: { type: String },
    notificationPreferences: {
      type: Object,
      default: {
        orders: {
          textMessage: false,
          email: false,
          app: true,
        },
        offers: {
          textMessage: false,
          email: false,
          app: true,
        },
      },
    },
    facebook: { id: { type: String }, token: { type: String } },
    google: { id: { type: String }, token: { type: String } },
    confirmationCode: { type: String },
    confirmationExpires: { type: Date },
    confirmed: { type: Boolean, default: false },
    avatar: { type: String },
    deleted: { type: Boolean, required: true, default: false },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    resetPasswordCode: { type: String },
    isStoreOwner: { type: Boolean, default: false },
    devices: { type: Array, required: true, default: [] },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

UserSchema.virtual("addressBook", {
  ref: "UserAddress",
  localField: "_id",
  foreignField: "owner",
  justOne: false,
});

UserSchema.virtual("store", {
  ref: "Store",
  localField: "_id",
  foreignField: "owner",
  justOne: false,
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject._id;
  return userObject;
};

UserSchema.methods.getAuthToken = async function (next, callback) {
  const user = this;
  const KEY_IDENTIFIER = getRandom(20);

  return user.runEncryption(next, null, `${KEY_IDENTIFIER}`, async (hash) => {
    const token = jwt.sign(
      {
        algorithm: "RS256",
        _id: user._id.toString(),
        expiresIn: 3600,
        kid: `kid-${hash}`,
      },
      PRIVATE_SIGNATURE
    );
    user.tokens = user.tokens.concat({ token });

    await user.save();

    callback(token);
  });
};

UserSchema.statics.findByCredentials = async function (
  email,
  password,
  facebookId,
  googleId
) {
  let isMatch;
  let user;
  if (email && !googleId) {
    user = await this.findOne({ email });
    if (!user) throw new Error("Login error: check your email or password.");
    isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Login error: check your email or password.");
  } else if (facebookId) {
    user = await this.findOne({ "facebook.id": facebookId });
    if (!user) throw new Error("Failed to retrieve you account");
  } else if (googleId) {
    user = await this.findOne({ email, "google.id": googleId });
    if (!user) throw new Error("Failed to retrieve you account");
  }

  return user;
};

UserSchema.methods.runEncryption = function (
  next,
  targetId,
  stringToHash,
  callback
) {
  const user = this;
  const SALT_FACTOR = 12;
  return bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    return bcrypt.hash(stringToHash || user[targetId], salt, (error, hash) => {
      if (error) return next(error);
      if (targetId) user[targetId] = hash;
      if (!stringToHash) next();

      if (callback) callback(hash);
    });
  });
};

UserSchema.methods.generateAccessCookie = async (res, token) => {
  res.setHeader("Access-Control-Allow-Origin", ROOT_URL);
  res.cookie("access_token", token, {
    maxAge: 9999999,
    httpOnly: true,
  });

  await res.append("Set-Cookie", `access_token="${token}";`);
};

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.runEncryption(next, "password");
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("email") || user.registrationSource !== "email")
    return next();
  const verificationCode = getRandom();

  user.runEncryption(
    next,
    "confirmationCode",
    `${verificationCode}`,
    (hash) => {
      user.confirmationCode = hash;
      user.confirmationExpires = Date.now() + tokenExpirationTime;

      const notification = {
        subject: "Email confirmation!",
        description: `${
          user.name || user.email
        }.Please Verify your email with this code: [${verificationCode}].`,
      };

      user.confirmed = false;
      next();
    }
  );
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const { PRIVATE_SIGNATURE } = require("../utils/config");
const { getRandom } = require("../utils/serverUtils");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, minlength: 4, required: true },
    lastName: { type: String, trim: true, minlength: 4, required: true },
    avatar: { type: String },
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
      required: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password"))
          throw new Error("Password should not include 'password'!");
      },
    },
    confirmationCode: { type: String },
    confirmationExpires: { type: Date },
    confirmed: { type: Boolean, default: false },
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
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

UserSchema.virtual("lists", {
  ref: "List",
  localField: "_id",
  foreignField: "owner",
  justOne: false,
});

UserSchema.virtual("tasks", {
  ref: "Task",
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

    try {
      await user.save();
      callback(token);
    } catch (error) {
      callback(undefined, error);
    }
  });
};

UserSchema.statics.findByCredentials = async function (email, password) {
  let isMatch;
  let user;
  if (email) {
    user = await this.findOne({ email });
    if (!user) throw new Error("Login error: check your email or password.");
    isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Login error: check your email or password.");
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
  try {
    return bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
      if (err) return next(err);

      return bcrypt.hash(
        stringToHash || user[targetId],
        salt,
        (error, hash) => {
          if (error) return next(error);
          if (targetId) user[targetId] = hash;
          if (!stringToHash) next();

          if (callback) callback(hash);
        }
      );
    });
  } catch (error) {
    return next(error);
  }
};

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.runEncryption(next, "password");
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

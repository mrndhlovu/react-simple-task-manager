const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

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

UserSchema.methods.getHashedString = async (string) => {
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

UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();
  const hashedPassword = await user.getHashedString(user.password);

  user.password = hashedPassword;
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

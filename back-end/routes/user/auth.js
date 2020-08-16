const router = require("express").Router();
const crypto = require("crypto");
const async = require("async");
const bcrypt = require("bcrypt");

const User = require("../../models/User");

const {
  auth,
  getUser,
  generateAccessCookie,
  populateUser,
} = require("../../middleware/authMiddleware");

const { ALLOWED_UPDATE_FIELDS_USER } = require("../../utils/config.js");
const {
  getRandom,
  tokenExpirationTime,
} = require("../../utils/serverUtils.js");

const STRINGS = require("../../lang/en");

router.post("/register", async (req, res, next) => {
  const user = new User({ ...req.body });

  await user.getAuthToken(next, async (token, error) => {
    if (error) {
      if (JSON.stringify(error.code) === "11000")
        next("User with that email already exists!");
      next(error);
    }

    await generateAccessCookie(res, token);
    await populateUser(user, res);
  });
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email) return next("Email field is required!");
    if (!password) return next("Password field is required!");
    const user = await User.findByCredentials(email, password);

    user.getAuthToken(next, async (token) => {
      await generateAccessCookie(res, token);

      await user.save();
      await populateUser(user, res);
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    await populateUser(user, res);
  } catch (error) {
    next(STRINGS.auth.noUserProfile);
  }
});

router.post("/logout", auth, async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user.save();
    res.send(STRINGS.auth.logoutSuccess);
  } catch (error) {
    next(error);
  }
});

router.post("/recovery/email", (req, res, next) => {
  const { email } = req.body;

  async.waterfall(
    [
      (done) => {
        User.findOne({ email }).exec((err, user) => {
          if (!user)
            done(`Account associated with email "${email}" was not found.`);
          else done(err, user);
        });
      },
      (user, done) => {
        crypto.randomBytes(20, async (err, buffer) => {
          const token = buffer.toString("hex");
          done(err, user, token);
        });
      },
      (user, token, done) => {
        User.findByIdAndUpdate(
          { _id: user._id },
          {
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + tokenExpirationTime,
          },
          { upsert: true, new: true }
        ).exec(async (err, newUser) => {
          const resetCode = getRandom();

          await user.runEncryption(
            next,
            "resetPasswordCode",
            `${resetCode}`,
            (hash) => {
              newUser.resetPasswordCode = hash;
              newUser.save();
              done(err, { resetCode, user: newUser, token });
            }
          );
        });
      },
      (data) => {
        const emailConfig = {
          resetCode: data.resetCode,
          tokenExpires: data.user.resetPasswordExpires,
          email: data.user.email,
        };

        sendResetPasswordEmail(emailConfig);

        res.json({
          success: true,
          message: `${STRINGS.auth.resetCodeSent} ${data.user.email}, enter that code here.`,
          token: data.token,
        });
      },
    ],
    (error) => next(error)
  );
});

router.post("/recovery/reset-code", (req, res, next) => {
  const { resetPin, resetToken } = req.body;

  User.findOne(
    {
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    },
    async (err, user) => {
      const isMatch = await bcrypt.compare(
        `${resetPin}`,
        user.resetPasswordCode
      );

      if (!isMatch) return next(STRINGS.auth.resetCodeExpired);

      const notification = {
        subject: `${user.email}, your password has been changed.`,
        description: `${user.email}, this is a confirmation that the password for your account ${user.email} has just been changed.`,
      };

      await user.save();

      const mailSent = true;
      if (mailSent) {
        return res.json({
          success: true,
          message: STRINGS.auth.setNewPassword,
        });
      }
    }
  );
});

router.post("/update-password", (req, res, next) => {
  const { password, resetToken } = req.body;

  User.findOne(
    {
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    },
    async (err, user) => {
      if (!user) return next(STRINGS.auth.resetTokenExpired);

      try {
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.resetPasswordCode = undefined;

        await user.save();

        const mailSent = true;

        if (mailSent) {
          return res.json({
            success: true,
            message: "Password changed!",
          });
        }
        return next(STRINGS.auth.failedToSendPasswordChangeEmail);
      } catch (error) {
        next(error);
      }
    }
  );
});

router.post("/logoutAll", auth, async (req, res, next) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (error) {
    next(error);
  }
});

router.patch("/update-user", auth, async (req, res, next) => {
  const updates = Object.keys(req.body);

  const isValidField = updates.every((update) =>
    ALLOWED_UPDATE_FIELDS_USER.includes(update)
  );

  if (!isValidField) return next(STRINGS.auth.invalidUpdateField);

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();

    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

router.delete("/delete-account", auth, async (req, res, next) => {
  try {
    await req.user.remove();
    res.send({ message: STRINGS.auth.accountDeleted });
  } catch (error) {
    next(STRINGS.auth.deleteAccountFail);
  }
});

router.post("/verify-account", auth, async (req, res, next) => {
  const { verificationCode } = req.body;
  try {
    const isMatch = await bcrypt.compare(
      verificationCode,
      req.user.confirmationCode
    );

    const isValid = await getUser(req.user);

    if (!isMatch || !isValid) return next(STRINGS.auth.verificationCodeExpired);

    req.user.confirmed = true;
    req.user.confirmationCode = undefined;
    req.user.confirmationExpires = undefined;

    const notification = {
      subject: `${req.user.email}, your account has been verified.`,
      description: `${req.user.email}, this is a confirmation that your account ${req.user.email} has just been verified.`,
    };

    req.user.save();
    res.send({ message: "Account verified!", user: req.user });
  } catch (error) {
    next(STRINGS.auth.failedToVerifyAccount);
  }
});

router.get("/verify-account-renew", auth, async (req, res, next) => {
  try {
    req.user.confirmationCode = undefined;
    req.user.confirmationExpires = undefined;

    const verificationCode = getRandom();
    await req.user.runEncryption(
      next,
      "confirmationCode",
      `${verificationCode}`,
      (hash) => {
        req.user.confirmationCode = hash;
        req.user.confirmationExpires = Date.now() + tokenExpirationTime;
        const notification = {
          subject: "New verification code!",
          description: `Your new verification code is [${verificationCode}]`,
        };

        req.user.save();
        res.send({
          message: STRINGS.auth.verificationSentToEmail,
          user: req.user,
        });
      }
    );
  } catch (error) {
    next(STRINGS.auth.renewActivationCodeFailed);
  }
});

module.exports = router;

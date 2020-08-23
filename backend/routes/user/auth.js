const router = require("express").Router();

const { auth } = require("../../middleware/authenticate");
const userService = require("../../services/user.services");
const STRINGS = require("../../lang/en");

router.post("/register", (req, res, next) => {
  userService
    .register(req.body)
    .then((data) => {
      userService.generateAccessCookie(res, data.token);
      res.status(201).send(data.user);
    })
    .catch((error) => next(error));
});

router.post("/login", (req, res, next) => {
  userService
    .findByCredentials(req.body)
    .then((data) => {
      userService.generateAccessCookie(res, data.token);
      res.status(200).send(data.user);
    })
    .catch((error) => next(error));
});

router.get("/me", auth, async (req, res, next) => {
  userService
    .populatedUser(req.user)
    .then((user) => res.status(200).send(user))
    .catch(() => next(STRINGS.auth.noUserProfile));
});

router.post("/logout", auth, async (req, res, next) => {
  userService
    .revokeAccess(req, res)
    .then(() => res.status(200).send(STRINGS.auth.logoutSuccess))
    .catch((error) => next(error));
});

router.post("/logoutAll", auth, async (req, res, next) => {
  userService
    .revokeAllAccessTokens(req, res)
    .then(() => res.status(200).send())
    .catch((error) => next(error));
});

router.patch("/update-user", auth, async (req, res, next) => {
  userService
    .updateUser(req, res)
    .then((user) => res.status(200).send(user))
    .catch((error) => next(error.message));
});

router.delete("/delete-account", auth, async (req, res, next) => {
  userService
    .deleteAccount(req, res)
    .then(() => res.status(200).send())
    .catch((error) => next(error));
});

module.exports = router;

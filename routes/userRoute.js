import { getUsers, getUserById } from "../controllers/userController.js";
import express from "express";
import passport from "passport";
import User from "../models/user.js";
import catchAsync from "../config/catchAsync.js";
const router = express.Router();

// express router method to create route for getting all users
router.get("/me", (req, res) => {
  res.json(req.user);
});
router.get("/logout", (req, res) => {
  req.logout();
  res.json(null);
});
router.post(
  "/signup",
  catchAsync(async (req, res, next) => {
    try {
      const { email, name, password } = req.body;
      const isAll = await User.findOne({ email: req.body.email });
      if (isAll)
        return res.json({user: null, message : "Email Exists !"});
      const user = await User.create(req.body);
      req.login(user, (err) => {
        if (err) return next(err);
        res.json({ user: user, message: null});
      });
    } catch (e) {
      console.log(e);
      res.json({ user: user, message: "Internal Server Error !"});
    }
  })
);
router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (user) {
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
      });
        return res.json({ user: req.user, message: null });
    }
    return res.json({user: null, message: info.message });
  })(req, res, next);
});
router.route("/").get(getUsers);
router.route("/:id").get(getUserById);
export default router;

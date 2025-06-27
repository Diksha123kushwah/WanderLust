const express = require("express");
const wrapAsync = require("../utilis/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const router = express.Router();
const userController = require("../controllers/user.js");

router
    .route("/signup")
    .get(userController.signUp)
    .post(wrapAsync(userController.postDataOfSignUp));

router
    .route("/login")
    .get(userController.loginForm)
    .post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), wrapAsync(userController.postDataOfLogin));

// Logout Route
router.get("/logout", userController.logOut)

module.exports = router;
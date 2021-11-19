const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const { body, validationResult, check } = require("express-validator");
const uid = require("uid2");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post(
  "/sign-up",
  body("userName")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Please enter a user name"),
  body("email").custom(async (email) => {
    return await userModel
      .findOne({ email: email.toLowerCase() })
      .then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
  }),
  check("password", "The password must be 5+ chars long and contain a number")
    .not()
    .isIn(["123", "password", "god"])
    .withMessage("Do not use a common word as the password")
    .isLength({ min: 5 })
    .matches(/\d/),
  check("email").isEmail().withMessage("Please enter a valid email address"),
  async function (req, res) {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      const { userName, email, password } = req.body;

      bcrypt.hash(password, saltRounds, async function (err, hash) {
        const newUser = new userModel({
          userName: userName,
          email: email,
          password: hash,
          token: uid(32),
        });
        await newUser.save();
        res.json({ Added: true, token: newUser.token });
      });
    }
  }
);

router.post(
  "/sign-in",
  body("email")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Please enter your e-mail"),
  body("password")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Please enter your password"),
  check("email").isEmail().withMessage("Please enter a valid email address"),
  body("email").custom(async (email) => {
    return await userModel
      .findOne({ email: email.toLowerCase() })
      .then((user) => {
        if (!user) {
          return Promise.reject("User doesn't exists");
        }
      });
  }),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.json(errors);
    } else {
      const { email, password } = req.body;
      const userExists = await userModel.findOne({
        email: email.toLowerCase(),
      });

      bcrypt.compare(password, userExists.password, function (err, result) {
        console.log(result);
        if (result) res.json({ userExists: true, token: userExists.token });
        else
          res.json({
            userExists: false,
            errors: [
              {
                value: "",
                msg: "Password or email is incorrect",
                param: "password",
                location: "body",
              },
              {
                value: "",
                msg: "",
                param: "email",
                location: "body",
              },
            ],
          });
      });
    }
  }
);

module.exports = router;

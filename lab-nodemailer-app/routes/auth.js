const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");
const mongoose = require('mongoose');
const sendMail = require('../mail/sendmail');


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", { message: "Indicate username, password and email" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }
  });

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const confirmationCode = (bcrypt.hashSync(username, salt));


    const newUser = new User({
      username,
      password: hashPass,
      email,
      confirmationCode: encodeURIComponent(confirmationCode),
      status: 'todo',
    });

    console.log('newUser')
    console.log(newUser)

    newUser.save((err) => {
      console.log("Entro en save")
      if (err) {
        res.render("auth/signup", { message: "error al crear usuario" });
      }
      else {
        sendMail();
        res.redirect("/");
      }
    });
  
  });

  authRoutes.get("/confirm/:confirmationCode", (req, res, next) => {
    const confirm = req.params.confirmationCode

    User.findOne({ confirmationCode: confirm })
      .then((user) => console.log(user))
      .catch((err) => next(err))
  });

  authRoutes.get("/profile/:confirmationCode", (req, res, next) => {
    res.render("auth/profile");
  });

  authRoutes.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  module.exports = authRoutes;

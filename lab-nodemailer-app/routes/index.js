const express = require('express');
const router  = express.Router();
const nodemailer = require ("nodemailer");
const User = require("../models/User");
// const auth = require('./auth');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


/* send email */
// router.post('/signup', (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   const email = req.body.email;
//   if (username === "" || password === "" || email === "") {
//     res.render("auth/signup", { message: "Indicate username, password and email" });
//     return;
//   }

//   User.findOne({ username }, "username", (err, user) => {
//     if (user !== null) {
//       res.render("auth/signup", { message: "The username already exists" });
//       return;
//     }

//     const salt = bcrypt.genSaltSync(bcryptSalt);
//     const hashPass = bcrypt.hashSync(password, salt);
//     const confirmationCode = encodeURIComponent(bcrypt.hashSync(username, salt));

//     let transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: 'pepe.ironhack@gmail.com',
//         pass: 'pepe1234Ironhack'
//       }
//     });
//     transporter.sendMail({
//       from: '"My Awesome Project 👻" <pepe.ironhack@gmail.com>',
//       to: email, 
//       subject: "Welcome", 
//       html: `http://localhost:3000/auth/confirm/${confirmationCode}`
//     })
//     .then(info => res.render('/'))
//     .catch(error => console.log(error));

//     const newUser = new User({
//       username,
//       password: hashPass,
//       email,
//       confirmationCode
//     });

//     console.log('newUser')
//     console.log(newUser)

//     newUser.save()
//     .then((user) => {
//       console.log('user:');
//       console.log(user);
//       res.redirect("/");
//     })
//     .catch(() => {
//       res.render("auth/signup", { message: "Something went wrong" });
//     })
//   })
// })


module.exports = router;

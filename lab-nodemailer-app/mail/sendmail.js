
const transporter = require("./transporter");


function sendMail(newUser) {
    transporter.sendMail({
        from: `"My Awesome Project 👻">`,
        to: 'mail@mail.com',
        subject: "Awesome Subject", // Asunto
        html: 'hola'
      })
      .then(info => console.log(info));
}


  module.exports = sendMail;

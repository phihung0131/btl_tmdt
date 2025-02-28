const nodemailer = require("nodemailer");

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use false for STARTTLS; true for SSL on port 465
  auth: {
    user: "phihung0131@gmail.com",
    pass: "fvvd kpdk nzeh fteo",
  },
});

// Configure the mailoptions object
const mailOptions = {
  from: "phihung0131@gmail.com",
  to: "phihung310104@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

// // Send the email
// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log("Error:", error);
//   } else {
//     console.log("Email sent: ", info.response);
//   }
// });

module.exports = transporter;

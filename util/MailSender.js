const nodemailer = require('nodemailer');
const config = require('../config/config');

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: config.SMTP_USERNAME,
    pass: config.SMTP_PASSWORD,
  },
});


// Function to send an email
const sendEmail = async (to, subject, desc) => {
    try {
        const mailOptions = {
            from: config.SMTP_USERNAME,
            to: to,
            subject: subject,
            text: desc,
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = { sendEmail };
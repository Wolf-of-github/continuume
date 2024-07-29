import nodemailer from 'nodemailer';
import {errorHandler} from './error.js'

const sendForgotPasswordEmail = async (resetLink, email) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'Outlook365',
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: 'Password Reset',
      html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };

    await transporter.sendMail(mailOptions,  (error, info) => {
      if (error) {
        return next(errorHandler(500, 'Message not sent'));
      }
      console.log(`Message Sent`);
    });

  } catch (error) {
    console.log(error)
    throw new Error('Error sending reset link email');
  }
};

export default sendForgotPasswordEmail;

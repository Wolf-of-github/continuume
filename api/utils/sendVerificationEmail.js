import nodemailer from 'nodemailer';
import {errorHandler} from './error.js'

const sendVerificationEmail = async (email, verificationLink) => {
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
      subject: 'Ledge Email Verification',
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    };

    await transporter.sendMail(mailOptions,  (error, info) => {
      if (error) {
        return next(errorHandler(500, 'Message not sent'));
      }
      console.log(`Message Sent`);
    });

  } catch (error) {
    throw new Error('Error sending verification email');
  }
};

export default sendVerificationEmail;

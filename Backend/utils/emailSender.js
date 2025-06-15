import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // or another provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmailWithAttachment = async (to, subject, text, attachmentPath) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments: [
      {
        filename: attachmentPath.split("/").pop(),
        path: attachmentPath,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

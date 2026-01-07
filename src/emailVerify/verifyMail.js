// import nodemailer from "nodemailer";
// import dotenv from "dotenv/config";

// export const verifyEmail = async (token, email) => {
//   const transport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.mailUser,
//       pass: process.env.mailPass,
//     },
//   });

//   const mailConfigureation = {
//     from: process.env.mailUser,
//     to: email,
//     subject: "Verification",
//     text: `Verification user ${token}`,
//   };

//   transport.sendMail(mailConfigureation, function (error, info) {
//     if (error) {
//       console.log("Email can't send ", error);
//       throw new Error(error);
//     }
//     console.log("Email sent succesfully");
//     console.log(info);
//   });
// };

import nodemailer from "nodemailer";
import dotenv from "dotenv/config";

export const verifyMail = async (token, email) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.mailUser,
      pass: process.env.mailPass,
    },
  });
  const configuration = {
    to: process.env.mailUser,
    from: email,
    subject: "Verification",
    text: `Verification token ${token}`,
  };

  transport.sendMail(configuration, function (error, info) {
    if (error) {
      console.log("Email can't sent");
      throw new Error(error);
    }
    console.log("Email sent successfully");
    console.log(info);
  });
};

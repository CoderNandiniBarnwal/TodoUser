// import userSchema from "../model/userSchema.js";
// import jwt from "jsonwebtoken";

// export const verifyToken = async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("bearer ")) {
//       return res.status(404).json({
//         success: false,
//         message: "Token authorization is invalid or not found",
//       });
//     } else {
//       const token = authHeader.split(" ")[1];
//       jwt.verify(token, process.env.SECRETKEY, async (err, decoded) => {
//         if (err) {
//           if (err.message === "ExpiredTokenError") {
//             return res.status(401).json({
//               success: false,
//               message: "Token Expired",
//             });
//           }
//           return res.status(401).json({
//             success: false,
//             message: "Token Invalid",
//           });
//         } else {
//           const { id } = decoded;
//           const user = await userSchema.findById(id);

//           if (!user) {
//             return res.status(404).json({
//               success: false,
//               message: "User not found",
//             });
//           } else {
//             (user.token = null), (user.isVerified = true), await user.save();
//             return res.status(200).json({
//               success: true,
//               message: "User verified successfully",
//             });
//           }
//         }
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

import userSchema from "../model/userSchema.js";
import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(400).json({
        success: false,
        message: "Token expired or invalid",
      });
    } else {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.SECRETKEY, async (err, decode) => {
        if (err) {
          if (err === "ExpiredTokenError") {
            return res.status(400).json({
              success: false,
              message: "Token expired",
            });
          }
          return res.status(400).json({
            success: false,
            message: "Token Invalid",
          });
        } else {
          const { id } = decode;
          const user = await userSchema.findById(id);

          if (!user) {
            return res.status(404).json({
              success: false,
              message: "User not found",
            });
          }
          user.token = null;
          user.isVerified = true;
          user.save();
          return res.status(200).json({
            success: true,
            message: "Token verified sucessfully",
          });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import userSchema from "../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
import { verifyMail } from "../emailVerify/verifyMail.js";
import sessionSchema from "../model/sessionSchema.js";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const repeat = await userSchema.findOne({ email });
    if (repeat) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const data = await userSchema.create({
      userName,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: data._id }, process.env.SECRETKEY, {
      expiresIn: "5m",
    });

    data.token = token;
    await data.save();
    verifyMail(token, email);

    return res.status(201).json({
      success: true,
      message: "Email successfully registered",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "unauthorized access",
      });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(404).json({
        success: false,
        message: "Invalid credintials",
      });
    }

    if (passwordCheck && user.isVerified === true) {
      await sessionSchema.findOneAndDelete({ userId: user._id });

      await sessionSchema.create({ userId: user._id });

      const accessToken = jwt.sign({ id: user._id }, process.env.SECRETKEY, {
        expiresIn: "10days",
      });
      const refreshToken = jwt.sign({ id: user._id }, process.env.SECRETKEY, {
        expiresIn: "30days",
      });

      user.isLogin = true;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Login successful",
        accessToken: accessToken,
        refreshToken: refreshToken,
        data: user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Complete verification first then login",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const existing = await sessionSchema.findOne({ userId: req.userId });
    const user = await userSchema.findById({ _id: req.userId });
    if (existing) {
      await sessionSchema.findOneAndDelete({ userId: req.userId });
      user.isLogin = false;
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Session successfully ended",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User had no session",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

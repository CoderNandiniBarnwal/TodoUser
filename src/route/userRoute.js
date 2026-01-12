import { login, logout, register } from "../controller/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import express from "express";
import {
  userValidateSchema,
  validateUser,
} from "../validators/userValidate.js";
import {hasToken} from "../middleware/hasToken.js";

const userRoute = express.Router();
userRoute.post("/register", validateUser(userValidateSchema), register);
userRoute.get("/verify", verifyToken);
userRoute.post("/login", login);
userRoute.delete("/logout", hasToken, logout);

export default userRoute;

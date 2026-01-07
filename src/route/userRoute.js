import { login, register } from "../controller/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import express from "express";

const userRoute = express.Router();
userRoute.post("/register", register);
userRoute.get("/verify", verifyToken);
userRoute.post("/login", login);

export default userRoute;

import { login, register } from "../controller/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import express from "express";
import { userValidateSchema, validateUser } from "../validators/userValidate.js";

const userRoute = express.Router();
userRoute.post("/register", validateUser(userValidateSchema), register);
userRoute.get("/verify", verifyToken);
userRoute.post("/login", login);

export default userRoute;

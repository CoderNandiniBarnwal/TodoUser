import express from "express";
import dotenv from "dotenv/config";
import { dbConnect } from "./src/config/dbConnect.js";
import userRoute from "./src/route/userRoute.js";
import todoRoute from "./src/route/todoRoute.js";

const app = express();
const port = process.env.PORT;

dbConnect();

app.use(express.json());
app.use("/user", userRoute);
app.use("/todo", todoRoute);

app.listen(port, () => {
  console.log(`Server running at Port ${port}`);
});

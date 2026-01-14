import express from "express";
import dotenv from "dotenv/config";
import { dbConnect } from "./src/config/dbConnect.js";
import userRoute from "./src/route/userRoute.js";
import todoRoute from "./src/route/todoRoute.js";
import multerRoute from "./src/route/multerRoute.js";

const app = express();
const port = process.env.PORT;

dbConnect();

app.use(express.json());
app.use('/upload', express.static("upload"))
app.use("/user", userRoute);
app.use("/todo", todoRoute);
app.use("/picture", multerRoute);

app.listen(port, () => {
  console.log(`Server running at Port ${port}`);
});

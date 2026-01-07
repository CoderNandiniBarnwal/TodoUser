import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  updateTodo,
} from "../controller/todoController.js";
import { hasToken } from "../middleware/hasToken.js";

const todoRoute = express.Router();
todoRoute.post("/create", hasToken, createTodo);
todoRoute.get("/getAll", hasToken, getAllTodo);
todoRoute.delete("/delete/:id", hasToken, deleteTodo);
todoRoute.put("/update/:id", hasToken, updateTodo);

export default todoRoute;

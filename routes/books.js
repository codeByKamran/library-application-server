import express from "express";
import { userRoles } from "../config/userRoles.js";
import {
  addBook,
  deleteBook,
  getBookById,
  getBooks,
  getManyBooks,
  updateBook,
} from "../controllers/booksControllers.js";
import verifyRoles from "../middlewares/verifyRoles.js";
const booksRouter = express.Router();

// Routes

booksRouter.get("/:id", getBookById); // everyone can hit

booksRouter.get("/", getBooks); // everyone can hit

booksRouter.post("/many", getManyBooks); // everyone can hit

booksRouter.post("/", verifyRoles(userRoles.Admin), addBook); // only admin can hit

booksRouter.put("/:id", verifyRoles(userRoles.Admin), updateBook); // only admin can hit

booksRouter.delete("/:id", verifyRoles(userRoles.Admin), deleteBook); // only admin can hit

export default booksRouter;

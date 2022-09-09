import express from "express";
const usersRouter = express.Router();
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/usersControllers.js";
import verifyRoles from "../middlewares/verifyRoles.js";
import { userRoles } from "../config/userRoles.js";

// Routes
usersRouter.get("/:id", getUserById); //accessable by admin & user only

usersRouter.get("/", getUsers); //accessable by admin only

usersRouter.put("/:id", updateUser); //accessable by admin only

usersRouter.delete("/:id", verifyRoles(userRoles.Admin), deleteUser); //accessable by admin only

export default usersRouter;

import express from "express";
const studentsRouter = express.Router();
import {
  getStudentById,
  getStudents,
  updateStudent,
  deleteStudent,
  addStudent,
} from "../controllers/studentsController.js";
import verifyRoles from "../middlewares/verifyRoles.js";
import { userRoles } from "../config/userRoles.js";

// Routes

// add verifyRoles(userRoles.Admin, userRoles.User)
// middleware to check roles before processing

studentsRouter.get("/:id", getStudentById); // anyone can hit

studentsRouter.get("/", getStudents); // anyone can hit

studentsRouter.post("/", verifyRoles(userRoles.Admin), addStudent); //accessable by admin only

studentsRouter.put("/:id", verifyRoles(userRoles.Admin), updateStudent); //accessable by admin only

studentsRouter.delete("/:id", verifyRoles(userRoles.Admin), deleteStudent); //accessable by admin only

export default studentsRouter;

import express from "express";
import {
  createStudentController,
  loginStudentController,
  updateStudentPasswordController,
  updateStudentController,
  deleteStudentController,
} from "../controllers/studentController.js";
import { authStudent } from "../middlewares/authStudent.js";
const studentRoute = express.Router();

studentRoute.post("/create", createStudentController);
studentRoute.post("/login", loginStudentController);
studentRoute.put('/update/:id', authStudent, updateStudentController);
studentRoute.put('/update-password', authStudent, updateStudentPasswordController)
studentRoute.delete('/delete/:id', authStudent, deleteStudentController);


export default studentRoute;

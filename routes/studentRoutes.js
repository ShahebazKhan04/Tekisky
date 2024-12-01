import express from "express";
import {
  createStudentController,
  loginStudentController,
  updateStudentPasswordController,
  updateStudentController,
  deleteStudentController,
  getAllStudentsController,
  getSingleStudentController,
} from "../controllers/studentController.js";
import { authStaff, authStudent } from "../middlewares/auth.js";
const studentRoute = express.Router();

studentRoute.post("/create", createStudentController);
studentRoute.post("/login", loginStudentController);
studentRoute.put('/update/:id', authStudent, updateStudentController);
studentRoute.put('/update-password', authStudent, updateStudentPasswordController)
studentRoute.delete('/delete/:id', authStaff, deleteStudentController);
studentRoute.get('/all', authStudent, authStaff, getAllStudentsController)
studentRoute.get('/:id', authStudent, authStaff, getSingleStudentController);


export default studentRoute;

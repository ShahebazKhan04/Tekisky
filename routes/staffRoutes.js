import express from "express";
import {
  createStaffController,
  deleteStaffController,
  getAllStaffController,
  getSingleStaffController,
  loginStaffController,
  updateStaffController,
  updateStaffPasswordController,
} from "../controllers/staffController.js";
import { authStaff } from "../middlewares/auth.js";
const staffRoute = express.Router();

staffRoute.post("/create", createStaffController);
staffRoute.post("/login", loginStaffController);
staffRoute.put("/update/:id", authStaff, updateStaffController);
staffRoute.put("/update-password", authStaff, updateStaffPasswordController);
staffRoute.delete("/delete/:id", authStaff, deleteStaffController);
staffRoute.get("/all", authStaff, getAllStaffController);
staffRoute.get("/:id", authStaff, getSingleStaffController);

export default staffRoute;

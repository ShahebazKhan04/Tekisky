import express from "express";
import { authStaff } from "../middlewares/auth.js";
import {
  addStudentsToBatchController,
  createBatchController,
  deleteBatchController,
  deleteSingleStudentFromBatchController,
  getAllBatchesController,
  getSingleBatchController,
  updatebatchController,
  updateStudentToBatchController,
} from "../controllers/batchController.js";
const batchRoute = express.Router();

batchRoute.post("/create", authStaff, createBatchController);
batchRoute.get("/all", authStaff, getAllBatchesController);
batchRoute.get("/:id", authStaff, getSingleBatchController);
batchRoute.delete("/delete/:id", authStaff, deleteBatchController);
batchRoute.put("/:id/add-students", authStaff, addStudentsToBatchController);
batchRoute.put("/update/:id", authStaff, updatebatchController);
batchRoute.put("/:id/update-students", authStaff, updateStudentToBatchController);
batchRoute.put("/:id/delete-student", authStaff, deleteSingleStudentFromBatchController);
export default batchRoute;

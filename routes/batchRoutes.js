import express from "express";
import { authStaff } from "../middlewares/auth.js";
import {
  createBatchController,
  deleteBatchController,
  getAllBatchesController,
  getSingleBatchController,
} from "../controllers/batchController.js";
const batchRoute = express.Router();

batchRoute.post("/create", authStaff, createBatchController);
batchRoute.get("/all", authStaff, getAllBatchesController);
batchRoute.get("/:id", authStaff, getSingleBatchController);
batchRoute.delete("/delete/:id", authStaff, deleteBatchController);
export default batchRoute;

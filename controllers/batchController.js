import {
  createBatchServices,
  deleteBatchServices,
  getAllBatchesServices,
  getSingleBatchServices,
} from "../services/batchServices.js";

export const createBatchController = async (req, res) => {
  try {
    const {
      batchName,
      subject,
      trainer,
      startDate,
      endDate,
      capacity,
      timeSchedule,
    } = req.body;
    if (
      !batchName ||
      !subject ||
      !trainer ||
      !startDate ||
      !endDate ||
      !capacity ||
      !timeSchedule
    ) {
      return res.status(404).json({
        success: false,
        message: "all fields are required",
      });
    }
    const batch = await createBatchServices({
      batchName,
      subject,
      trainer,
      startDate,
      endDate,
      capacity,
      timeSchedule,
    });
    res.status(201).json({
      success: true,
      message: "batch created successfully",
      batch: batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while creating batch",
      error: error.message,
    });
  }
};

export const getAllBatchesController = async (req, res) => {
  try {
    const batches = await getAllBatchesServices();
    res.status(201).json({
      success: true,
      totalBatches: batches.length,
      batches: batches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while getting all batches",
      error: error.message,
    });
  }
};

export const getSingleBatchController = async (req, res) => {
  try {
    const id = req.params.id;
    const batch = await getSingleBatchServices(id);
    if (!batch) {
      return res.status(400).json({
        success: false,
        message: "No batch found",
      });
    }
    res.status(201).json({
      success: true,
      batch: batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while getting batch",
      error: error.message,
    });
  }
};

export const deleteBatchController = async (req, res) => {
  try {
    const id = req.params.id;
    const batch = await deleteBatchServices(id);
    if (!batch) {
      return res.status(400).json({
        success: false,
        message: "No batch found",
      });
    }
    res.status(200).json({
      success: true,
      message: "batch deleted successfully",
      batch: batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while deleting batch",
      error: error.message,
    });
  }
};

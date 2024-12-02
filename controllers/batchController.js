import batchModel from "../models/batchModel.js";
import staffModel from "../models/staffModel.js";
import {
  addStudentsToBatchServices,
  createBatchServices,
  deleteBatchServices,
  getAllBatchesServices,
  getSingleBatchServices,
  updatebatchServices,
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

export const addStudentsToBatchController = async (req, res) => {
  try {
    const batchId = req.params.id;
    const { studentIds } = req.body;

    if (studentIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide a valid array of student IDs.",
      });
    }

    const batch = await addStudentsToBatchServices(batchId);
    if (!batch) {
      return res.status(400).json({
        success: false,
        message: "please provide a array pf students",
      });
    }

    const alreadyPresent = studentIds.filter((id) =>
      batch.students.includes(id)
    );
    if (alreadyPresent.length > 0) {
      return res.status(400).json({
        success: false,
        message: `The following students are already in the batch`,
      });
    }

    batch.students.push(...studentIds);
    await batch.save();

    res.status(200).json({
      success: true,
      message: "Students added successfully.",
      data: batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while adding students to batch",
      error: error.message,
    });
  }
};

export const updatebatchController = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      batchName,
      subject,
      trainer,
      startDate,
      endDate,
      capacity,
      status,
      timeSchedule,
    } = req.body;

    const batch = await updatebatchServices(id, {
      batchName,
      subject,
      trainer,
      startDate,
      endDate,
      capacity,
      status,
      timeSchedule,
    });

    res.status(200).json({
      success: true,
      message: "batch updated successfully",
      batch: batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while upadting batch controller",
      error: error.message,
    });
  }
};

export const updateStudentToBatchController = async (req, res) => {
  try {
    const batchId = req.params.id;
    const { studentIds } = req.body;  
    if (studentIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide a valid array of student IDs.",
      });
    }

    const batch = await batchModel.findByIdAndUpdate(
      batchId,
      { students: studentIds },
      { new: true, runValidators: true }
    );

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "batch updated successfully",
      updatedBatch: batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while upadting batch controller",
      error: error.message,
    });
  }
};

export const deleteSingleStudentFromBatchController = async (req, res) => {
  try {
    const batchId = req.params.id;
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Provide a valid student ID to delete.",
      });
    }

    const batch = await batchModel.findByIdAndUpdate(
      batchId,
      { $pull: { students: studentId } },
      { new: true }
    );

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: `Student removed successfully.`,
      updatedBatch: batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while removing student from batch.",
      error: error.message,
    });
  }
};
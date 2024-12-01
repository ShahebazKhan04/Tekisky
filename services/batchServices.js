import batchModel from "../models/batchModel.js";

export const createBatchServices = async ({
  batchName,
  subject,
  trainer,
  startDate,
  endDate,
  capacity,
  timeSchedule,
}) => {
  try {
    const batch = await batchModel.create({
      batchName,
      subject,
      trainer,
      startDate,
      endDate,
      capacity,
      timeSchedule,
    });
    return batch;
  } catch (error) {
    console.log("error in services while creating batch" + error.message);
}
};

export const getAllBatchesServices = async () => {
    try {
        const batches = await batchModel.find();
        return batches;
    } catch (error) {
        console.log("error in services while getting all batches" + error.message);
    }
}

export const getSingleBatchServices = async (id) => {
    try {
        const batch = await batchModel.findById(id);
        return batch;
    } catch (error) {
        console.log("error in services while getting batch" + error.message);
    }
}
export const deleteBatchServices = async (id) => {
    try {
        const batch = await batchModel.findByIdAndDelete(id);
        return batch;
    } catch (error) {
        console.log("error in services while deleting batch" + error.message);
    }
}
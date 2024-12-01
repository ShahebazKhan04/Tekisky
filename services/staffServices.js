import staffModel from "../models/staffModel.js";

export const createStaffServices = async (data) => {
  try {
    const staff = await staffModel.create(data);
    return staff;
  } catch (error) {
    console.log("error while creating staff in services" + error.message);
  }
};

export const loginStaffServices = async (email) => {
  try {
    const staff = await staffModel.findOne(email);
    return staff;
  } catch (error) {
    console.log("error while login staff in services" + error.message);
  }
};

export const updateStaffServices = async (
  id,
  { name, mobileNumber}
) => {
  try {
    const staff = await staffModel.findByIdAndUpdate(
      id,
      {
        name,
        mobileNumber,
      },
      { new: true }
    );
    return staff;
  } catch (error) {
    console.log("error while updating staff in services" + error.message);
  }
};

export const updateStaffPasswordServices = async (id) => {
  try {
    const staff = await staffModel.findById(id);
    return staff;
  } catch (error) {
    console.log("error while updating staff password in services" + error.message);
  }
};

export const deleteStaffServices = async (id) => {
  try {
    const staff = await staffModel.findByIdAndDelete(id);
    return staff;
  } catch (error) {
    console.log("error while deleting staff in services" + error.message);
  }
};

export const getAllStaffServices = async () => {
  try {
    const staff = await staffModel.find();
    return staff;
  } catch (error) {
    console.log("error while getting all staff in services" + error.message);
  }
};

export const getSingleStaffServices = async (id) => {
  try {
    const staff = await staffModel.findById(id);
    return staff;
  } catch (error) {
    console.log("error while deleting staff in services" + error.message);
  }
};

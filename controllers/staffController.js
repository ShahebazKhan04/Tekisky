import staffModel from "../models/staffModel.js";
import {
  createStaffServices,
  deleteStaffServices,
  getAllStaffServices,
  getSingleStaffServices,
  loginStaffServices,
  updateStaffPasswordServices,
  updateStaffServices,
} from "../services/staffServices.js";

export const createStaffController = async (req, res) => {
  try {
    const { name, email, mobileNumber, password, role } = req.body;
    if (!name || !email || !mobileNumber || !password || !role) {
      return res.status(404).json({
        success: false,
        message: "all fields are required",
      });
    }
    const isStaff = await staffModel.findOne({ email });
    if (isStaff) {
      return res.status(400).json({
        success: false,
        message: "Staff already exists",
      });
    }
    const staff = await createStaffServices(req.body);
    res.status(201).json({
      success: true,
      message: "Staff created successfully",
      staff: staff,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({
        success: false,
        message: "Staff with this email already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: "error while creating staff",
      error: error.message,
    });
  }
};

export const loginStaffController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Please provide email and password",
      });
    }
    const staff = await loginStaffServices({ email });
    if (!staff) {
      return res.status(400).json({
        success: false,
        message: "No student found",
      });
    }
    const isMatch = await staff.comparePassword(password);
    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "Invalid Email or Passwored",
      });
    }
    const token = staff.generateToken();

    res.status(200).json({
      success: true,
      message: "Student logged successfully",
      staff: staff.email,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while login staff",
      error: error.message,
    });
  }
};

export const updateStaffController = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, mobileNumber } = req.body;
    if (!name || !mobileNumber) {
      return res.status(404).json({
        success: false,
        message: "all fields are required",
      });
    }
    const staff = await updateStaffServices(id, {
      name,
      mobileNumber,
    });
    if (!staff) {
      return res.status(400).json({
        success: false,
        message: "No student found",
      });
    }
    res.status(200).json({
      success: true,
      message: "staff updated successfully",
      staff: staff,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while updating staff",
      error: error.message,
    });
  }
};

export const updateStaffPasswordController = async (req, res) => {
  try {
    const id = req.staff._id;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(404).json({
        success: false,
        message: "Please provide old pasword and new passeword",
      });
    }
    const staff = await updateStaffPasswordServices(id);
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "staff not found",
      });
    }
    const isMatch = await staff.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "Invalid old Password",
      });
    }
    staff.password = newPassword;
    await staff.save();
    res.status(200).json({
      success: true,
      message: "staff password updated successfully",
      staff: staff.email,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while reseting staff password",
      error: error.message,
    });
  }
};

export const deleteStaffController = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteStaffServices(id);
    res.status(200).json({
      success: true,
      message: "staff deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while deleting staff",
      error: error.message,
    });
  }
};

export const getAllStaffController = async (req, res) => {
  try {
    const staff = await getAllStaffServices();
    staff.password = undefined;
    res.status(200).json({
      success: true,
      totalStaff: staff.length,
      staff: staff,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while getting all staff",
      error: error.message,
    });
  }
};

export const getSingleStaffController = async (req, res) => {
  try {
    const id = req.params.id;
    const staff = await getSingleStaffServices(id);
    staff.password = undefined;
    res.status(200).json({
      success: true,
      student: staff,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while getting single staff",
      error: error.message,
    });
  }
};

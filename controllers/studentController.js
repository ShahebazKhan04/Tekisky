import {
  createStudentServices,
  loginStudentServices,
  updateStudentPasswordServices,
  updateStudentServices,
  deleteStudentServices,
  getAllStudentsServices,
  getSingleStudentServices,
} from "../services/studentServices.js";

export const createStudentController = async (req, res) => {
  try {
    const { name, email, mobileNumber, password, address, educationDetails } =
      req.body;
    if (
      !name ||
      !email ||
      !mobileNumber ||
      !password ||
      !address ||
      !educationDetails
    ) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }
    const student = await createStudentServices({
      name,
      email,
      mobileNumber,
      password,
      address,
      educationDetails,
    });
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while creating student",
      error: error.message,
    });
  }
};

export const loginStudentController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Please provide email and password",
      });
    }
    const student = await loginStudentServices({ email });
    if (!student) {
      return res.status(400).json({
        success: false,
        message: "No student found",
      });
    }
    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "Invalid Email or Passwored",
      });
    }
    const token = student.generateToken();

    res.status(200).json({
      success: true,
      message: "Student logged successfully",
      student: student.email,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while login student",
      error: error.message,
    });
  }
};

export const updateStudentController = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, mobileNumber, address, educationDetails } = req.body;
    if (!name || !mobileNumber || !address || !educationDetails) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }
    const student = await updateStudentServices(id, {
      name,
      mobileNumber,
      address,
      educationDetails,
    });
    if (!student) {
      return res.status(400).json({
        success: false,
        message: "No student found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while updating student",
      error: error.message,
    });
  }
};

export const updateStudentPasswordController = async (req, res) => {
  try {
    const id = req.user._id;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(404).json({
        success: false,
        message: "Please provide old pasword and new passeword",
      });
    }
    const student = await updateStudentPasswordServices(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    const isMatch = await student.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "Invalid old Password",
      });
    }
    student.password = newPassword;
    await student.save();
    res.status(200).json({
      success: true,
      message: "Student password updated successfully",
      student: student.email,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while reseting student password",
      error: error.message,
    });
  }
};

export const deleteStudentController = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await deleteStudentServices(id);
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while deleting student",
      error: error.message,
    });
  }
};

export const getAllStudentsController = async (req, res) => {
  try {
    const students = await getAllStudentsServices()
    students.password = undefined
    res.status(200).json({
      success: true,
      totalStudents: students.length,
      student: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while getting all students",
      error: error.message,
    });
  }
};

export const getSingleStudentController = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await getSingleStudentServices(id);
    student.password = undefined
    res.status(200).json({
      success: true,
      student: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while getting single student",
      error: error.message,
    });
  }
};
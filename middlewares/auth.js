import jwt from "jsonwebtoken";
import staffModel from "../models/staffModel.js";

const verifyToken = (req) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "token not found",
    });
  }
  return jwt.verify(token, process.env.SECRET_KEY); // Fix the typo: "SECRET_KEY"
};

// Student Authentication Middleware
export const authStudent = async (req, res, next) => {
  try {
    const decodedData = verifyToken(req); // Verify the JWT token
    req.user = { _id: decodedData._id }; // Assign `req.user._id` for student operations
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `Authentication failed: ${error.message}`,
    });
  }
};

// Teacher (and Director) Authentication Middleware
export const authStaff = async (req, res, next) => {
  try {
    const decodedData = verifyToken(req); // Verify the JWT token
    req.staff = { _id: decodedData._id }; // Assign `req.staff._id` for teacher operations

    // Check if the staff member exists in the database
    const staff = await staffModel.findById(req.staff._id);
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    // Allow access only for roles: "teacher" or "director"
    if (staff.role === "teacher" || staff.role === "director") {
      next(); // Pass control to the next middleware or route handler
    } else {
      return res.status(403).json({
        success: false,
        message: "Access restricted to teachers and directors only",
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `Authentication failed: ${error.message}`,
    });
  }
};

import studentModel from "../models/studentModel.js";

export const createStudentServices = async ({
  name,
  email,
  mobileNumber,
  password,
  address,
  educationDetails,
}) => {
  try {
    const student = await studentModel.create({
      name,
      email,
      mobileNumber,
      password,
      address,
      educationDetails,
    });
    return student;
  } catch (error) {
    console.log("error while creating student in services" + error.message);
  }
};

export const loginStudentServices = async (email) => {
  try {
    const student = await studentModel.findOne(email);
    return student;
  } catch (error) {
    console.log("error while login student in services" + error.message);
  }
};

export const updateStudentServices = async (
  id,
  { name, email, mobileNumber, address, educationDetails }
) => {
  try {
    const student = await studentModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        mobileNumber,
        address,
        educationDetails,
      },
      { new: true }
    );
    return student;
  } catch (error) {
    console.log("error while updating student in services" + error.message);
  }
};

export const updateStudentPasswordServices = async (id) => {
    try {
      const student = await studentModel.findById(id)
      return student  
    } catch (error) {
        console.log("error while updating student in services" + error.message);
    }
}

export const deleteStudentServices = async (id) => {
    try {
      const student = await studentModel.findByIdAndDelete(id)
      return student  
    } catch (error) {
        console.log("error while deleting student in services" + error.message);
    }
}
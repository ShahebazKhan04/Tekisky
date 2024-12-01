import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student name is required"],
  },
  email: {
    type: String,
    required: [true, "Student email is required"],
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: [true, "mobile number is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  educationDetails: [
    {
      tenth: {
        schoolName: {
          type: String,
        },
        percentage: {
          type: Number,
          required: [true, "Tenth percentage is required"],
        },
      },
      twelfth: {
        collageName: {
          type: String,
        },
        percentage: {
          type: String,
        },
      },
      diploma: {
        collageName: {
          type: String,
        },
        percentage: {
          type: String,
        },
      },
      degree: {
        degreeName: {
          type: String,
        },
        collageName: {
          type: String,
        },
        percentage: {
          type: String,
        },
      },
      yearOfPassing: {
        type: Number,
        required: [true, "Year of passing is required"],
      },
    },
  ],
});

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});


studentSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
    expiresIn: "10d",
  });
};

studentSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const studentModel = mongoose.model("Students", studentSchema);
export default studentModel;

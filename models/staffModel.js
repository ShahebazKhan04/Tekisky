import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const staffSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is requied"],
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["trainer", "director"],
  },
});

staffSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

staffSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

staffSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this.id }, process.env.SECRET_KEY, {
    expiresIn: "10d",
  });
};

const staffModel = mongoose.model("Staff", staffSchema);
export default staffModel;

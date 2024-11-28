import mongoose from "mongoose";
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL + process.env.DBNAME);
    console.log(
      `connected to db ==> ${process.env.MONGOURL + process.env.DBNAME}`
    );
  } catch (error) {
    console.log("error while connecting db -" + error.message);
  }
};

export default connectDb;
import jwt from "jsonwebtoken";

export const authStudent = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "no Token provided",
      });
    }
    const decodeData = await jwt.verify(token, process.env.SECRETE_KEY);
    req.user = decodeData;
    next();
  } catch (error) {
    console.log("error in Student Auth middleware" + error.message);
  }
};

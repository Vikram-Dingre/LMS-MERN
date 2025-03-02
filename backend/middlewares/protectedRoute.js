import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const protectRoute = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(404).json({
      success: false,
      message: "no authorization header. please login first.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "no authorization valid token. please login again.",
    });
  }
};

export default protectRoute;

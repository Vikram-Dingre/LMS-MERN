import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/getkey", async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "key fetched successfully.",
    key: process.env.RAZORPAY_API_KEY,
  });
});

export default router;

import express from "express";
import {
  createOrder,
  verifyOrder,
} from "../../controllers/order-controller/orderController.js";
import isCourseAlreadyBought from "../../middlewares/isCourseAlreadyBoughtByStudent.js";

const router = express.Router();

router.post("/create", isCourseAlreadyBought, createOrder);
router.post("/verify", verifyOrder);

export default router;

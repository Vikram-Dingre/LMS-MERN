import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: String,
  userId: String,
  userName: String,
  userEmail: String,
  courseId: String,
  courseTitle: String,
  courseImage: String,
  coursePricing: String,
  paymentId: String,
  paymentSignature: String,
  orderDate: String,
  orderStatus: { type: String, default: "pending" },
  instructorId: String,
  instructorName: String,
  amount: String,
});

const Order = new mongoose.model("Order", orderSchema);

export default Order;

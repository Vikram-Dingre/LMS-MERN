import axiosInstance from "@/api/axios-instance";

async function createOrderService({
  orderId,
  userId,
  userName,
  userEmail,
  courseId,
  courseTitle,
  courseImage,
  coursePricing,
  paymentId,
  paymentSignature,
  orderDate,
  orderStatus,
  instructorId,
  instructorName,
  amount,
}) {
  const { data } = await axiosInstance.post("/order/create", {
    orderId,
    userId,
    userName,
    userEmail,
    courseId,
    courseTitle,
    courseImage,
    coursePricing,
    paymentId,
    paymentSignature,
    orderDate,
    orderStatus,
    instructorId,
    instructorName,
    amount,
  });
  return data;
}

export default createOrderService;

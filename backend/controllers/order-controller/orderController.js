import Order from "../../models/orderModel.js";
import RazorpyInstance from "../../utils/razorPayInstance.js";
import Course from "../../models/courseModel.js";
import StudentCourses from "../../models/studentCourses.js";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

async function createOrder(req, res) {
  try {
    const {
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
    } = req.body;

    const options = {
      amount: 100,
      currency: "INR",
    };

    const order = await RazorpyInstance.orders.create(options);

    // const isAlready = await Order.findById(order.id)

    // if(isAlready){
    //   return res.status(200).json({success:false,message:"Course is Already Boutght by Student."})
    // }

    const newOrder = new Order({
      orderId: order.id,
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
      amount: amount,
    });

    await newOrder.save();
    return res
      .status(200)
      .json({ success: true, message: "order created successfully.", order });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "some error occured while creating order.",
      error,
    });
  }
}

async function verifyOrder(req, res) {
  // console.log("verifying order", req);
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(404).json({
        success: false,
        message: "some error occured while verifying order signature mismatch.",
      });
    }
    const order = await Order.findOne({ orderId: razorpay_order_id }); // here dont use findById method because razorpayorderId is not used for that
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "no order found for verification." });

    order.orderId = razorpay_order_id;
    order.orderStatus = "paid";
    order.paymentId = razorpay_payment_id;
    order.paymentSignature = razorpay_signature;

    await order.save();
    const studentCourses = await StudentCourses.findOne({
      userId: order.userId,
    });

    if (studentCourses) {
      await studentCourses.courses.push({
        courseId: order.courseId,
        title: order.courseTitle,
        instructorId: order.instructorId,
        instructorName: order.instructorName,
        dateOfPurchase: Date.now(),
        courseImage: order.courseImage,
      });
      await studentCourses.save();
    } else {
      const newStudentCourses = new StudentCourses({
        userId: order.userId,
        courses: [
          {
            courseId: order.courseId,
            title: order.courseTitle,
            instructorId: order.instructorId,
            instructorName: order.instructorName,
            dateOfPurchase: Date.now(),
            courseImage: order.courseImage,
          },
        ],
      });
      await newStudentCourses.save();
    }

    const course = await Course.findById(order.courseId);

    await course.students.push({
      studentId: order.userId,
      studentName: order.userName,
      studentEmail: order.userEmail,
      paidAmount: order.coursePricing,
    });

    await course.save();

    //  res
    //   .status(200)
    //   .json({ success: true, message: "order confirmed.", order });

    setTimeout(()=>{
      res.redirect("https://mern-lms-lb3z.onrender.com/payment-success");
    },2000)
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "error while verifying order.", error });
  }
}

export { createOrder, verifyOrder };

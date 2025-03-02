import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import instructorCourseRoutes from "./routes/instructor-routes/index.js";
import studentCourseRoutes from "./routes/student-routes/index.js";
import mediaRouter from "./routes/mediaRoutes.js";
import orderRoutes from "./routes/order-routes/orderRoutes.js";
import getKeyRoute from "./routes/getkeyRoute.js";
//dotenv file configuration
dotenv.config();

// app creation
const app = express();

//connection to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(` ✅ Connected to MongoDB Successfully....`);
  })
  .catch((err) => {
    console.log(`❌ Can't Connect to MongoDB.....${err}`);
  });

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // this is required , if it is not then the expected signature not comes wrong

//routes
app.use("/auth", authRouter);
app.use("/instructor/course", instructorCourseRoutes);
app.use("/student/course", studentCourseRoutes);
app.use("/media", mediaRouter);
app.use("/order", orderRoutes);
app.use("/api", getKeyRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `✅ backend running on port http://localhost:${process.env.PORT}`
  );
});

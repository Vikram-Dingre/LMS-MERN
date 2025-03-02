import mongoose from "mongoose";

const studentCoursesSchema = new mongoose.Schema({
  userId: String,
  courses: [
    {
      courseId: String,
      title: String,
      instructorId: String,
      instructorName: String,
      dateOfPurchase: Date,
      courseImage: String,
    },
  ],
});

const StudentCourses = new mongoose.model(
  "StudentCourses",
  studentCoursesSchema
);

export default StudentCourses;

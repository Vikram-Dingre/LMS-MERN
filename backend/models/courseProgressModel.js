import mongoose from "mongoose";

const lectureProgressSchema = {
  viewed: Boolean,
  viewedDate: Date,
  lectureId: String,
};

const courseProgressSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  completed: Boolean,
  completionData: Date,
  lectureProgress: [lectureProgressSchema],
});

const CourseProgress = new mongoose.model("Progress", courseProgressSchema);

export default CourseProgress;

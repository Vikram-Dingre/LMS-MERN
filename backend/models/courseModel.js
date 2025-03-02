import mongoose from "mongoose";
const LectureSchema = new mongoose.Schema({
  title: String,
  video_url: String,
  public_id: String,
  freePreview: Boolean,
});

const courseSchema = new mongoose.Schema({
  instructorId: String,
  instructorName: String,
  date: Date,
  title: String,
  category: String,
  level: String,
  primaryLanguage: String,
  subtitle: String,
  description: String,
  image: String,
  welcomeMessage: String,
  pricing: Number,
  objectives: String,
  students: [
    {
      studentId: String,
      studentName: String,
      studentEmail: String,
      paidAmount: String,
    },
  ],
  curriculum: [LectureSchema],
  isPublised: Boolean,
});

const Course = new mongoose.model("Course", courseSchema);

export default Course;

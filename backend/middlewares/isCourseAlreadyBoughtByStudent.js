import Course from "../models/courseModel.js";
import StudentCourses from "../models/studentCourses.js";

async function isCourseAlreadyBought(req, res, next) {
  try {
    const { userId, courseId } = req.body;

    const course = await Course.findById(courseId);

    if (course) {
      const isAready =
        course.students.length &&
        course.students.find((student) => student.studentId === userId);
      if (isAready) {
        return res.status(200).json({
          success: false,
          message: "course is already bought by student.",
          alreadyPurchased: true,
        });
      } else {
        next();
      }
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Error while cheking isAlready course bought or not.",
      error,
    });
  }
}

export default isCourseAlreadyBought;

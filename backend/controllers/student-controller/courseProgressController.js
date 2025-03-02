import Course from "../../models/courseModel.js";
import CourseProgress from "../../models/courseProgressModel.js";
import StudentCourses from "../../models/studentCourses.js";

async function getCurrentCourseProgress(req, res) {
  try {
    const { userId, courseId } = req.params;

    const studentPurchasedCourses = await StudentCourses.findOne({ userId });

    const isPurchased = studentPurchasedCourses.courses.find(
      (course) => course.courseId === courseId
    );

    if (!isPurchased) {
      return res.status(404).json({
        success: false,
        message: "you need to purchase this course to access it.",
        isPurchased: false,
      });
    }

    const currentCourseProgress = await CourseProgress.findOne({
      userId,
      courseId,
    });
    if (
      !currentCourseProgress ||
      currentCourseProgress?.lectureProgress?.length === 0
    ) {
      const course = await Course.findById(courseId);

      if (!course) {
        return res
          .status(404)
          .json({ success: false, message: "course not found" });
      }

      return res.status(200).json({
        success: true,
        message:
          "No Progress found for this course , you can start watching this course!",
        isPurchased: true,
        progress: [],
        courseDetails: course,
        completed: false,
      });
    }

    const courseDetails = await Course.findById(courseId);

    return res.status(200).json({
      success: true,
      message: "course progress found",
      completed: currentCourseProgress?.completed,
      completionDate: new Date(),
      isPurchased: true,
      progress: currentCourseProgress?.lectureProgress,
      courseDetails,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "some error occured while fetching course progress.",
      error,
    });
  }
}

async function markCurrentLectureAsViewed(req, res) {
  try {
    const { userId, courseId, lectureId } = req.params;

    const studentCourses = await StudentCourses.findOne({ userId });
    const course = await Course.findById(courseId);

    const isPurchased = studentCourses.courses.find(
      (course) => course.courseId === courseId
    );

    if (!isPurchased) {
      return res.status(404).json({
        success: false,
        message: "you need to purchase this course before accessing it.",
      });
    }

    const courseProgress = await CourseProgress.findOne({ courseId, userId });

    if (!courseProgress) {
      const newCourseProgress = new CourseProgress({
        userId,
        courseId,
        completed: course.curriculum.length === 1,
        completionDate: new Date(),
        lectureProgress: [
          {
            lectureId,
            viewed: true,
            viewedDate: new Date(),
          },
        ],
      });

      //   const isCompleted = courseProgress.lectureProgress.every((lecture)=>lecture.viewed)

      //   if(isCompleted){
      //     courseProgress.completed = true;
      //     courseProgress.completionDate= new Date()
      //   }

      await newCourseProgress.save();

      return res.status(200).json({
        success: true,
        message: "lectue is marked as viewed successfully!",
        isPurchased: true,
      });
    } else {
      courseProgress.lectureProgress.push({
        lectureId: lectureId,
        viewed: true,
        viewedDate: new Date(),
      });

      const isCompleted =
        courseProgress.lectureProgress.length === course.curriculum.length &&
        courseProgress.lectureProgress.every((lecture) => lecture.viewed);

      if (isCompleted) {
        courseProgress.completed = true;
        courseProgress.completionDate = new Date();
      }
      await courseProgress.save();
    }

    return res.status(200).json({
      success: true,
      message: "current lecture is marked as viewed!",
      isPurchased: true,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "some error occured while making current lecture as viewed.",
      error,
    });
  }
}

async function resetCourseProgress(req, res) {
  try {
    const { userId, courseId } = req.params;
    const currentCourseProgress = await CourseProgress.findOne({
      userId,
      courseId,
    });
    if (!currentCourseProgress) {
      return res
        .status(404)
        .json({ success: false, message: "no course progress found for you." });
    }

    // currentCourseProgress = {
    //   userId,
    //   courseId,
    //   completed: false,
    //   lectureProgress: [],
    // };

    currentCourseProgress.lectureProgress = [];
    currentCourseProgress.completed = false;

    // console.log(currentCourseProgress,"reseted")
    const resetedCourseProgress = await currentCourseProgress.save();
    return res.status(200).json({
      success: true,
      message: "course progres reseted successfully.",
      courseProgress: resetedCourseProgress,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "error while resetting course progress.",
      error,
    });
  }
}

export {
  getCurrentCourseProgress,
  markCurrentLectureAsViewed,
  resetCourseProgress,
};

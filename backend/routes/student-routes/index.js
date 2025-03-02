import express from "express";
import {
  fetchStudentPurchasedCoursesList,
  getStudentViewCourseDetails,
  getStudentViewCoursesList,
  isCoursePurchased,
} from "../../controllers/student-controller/index.js";
import {
  getCurrentCourseProgress,
  markCurrentLectureAsViewed,
  resetCourseProgress,
} from "../../controllers/student-controller/courseProgressController.js";

const router = express.Router();

router.get("/get", getStudentViewCoursesList);
router.get("/get/details/:id", getStudentViewCourseDetails);
router.get("/purchased/get/:userId", fetchStudentPurchasedCoursesList);
router.get(
  "/purchased/get/details/:userId/:courseId",
  getCurrentCourseProgress
);
router.get("/isPurchased/:userId/:courseId", isCoursePurchased);
router.get(
  "/progress/markAsViewed/:userId/:courseId/:lectureId",
  markCurrentLectureAsViewed
);

router.get("/progress/resetProgress/:userId/:courseId", resetCourseProgress);
export default router;

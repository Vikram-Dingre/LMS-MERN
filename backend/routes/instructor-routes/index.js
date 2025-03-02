import express from "express";
import {
  addNewCourse,
  deleteCourse,
  getAllCourses,
  getCourseDetailsById,
  updateCourseById,
} from "../../controllers/instructor-controller/index.js";

const router = express.Router();

router.post("/add", addNewCourse);
router.get("/get", getAllCourses);
router.put("/update/:id", updateCourseById);
router.get("/get/details/:id", getCourseDetailsById);
router.delete("/delete/:id", deleteCourse);

export default router;

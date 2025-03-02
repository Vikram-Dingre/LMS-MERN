import Course from "../../models/courseModel.js";

async function addNewCourse(req, res) {
  try {
    const courseData = req.body;
    const newCourse = new Course(courseData);
    const saveCourse = await newCourse.save();

    if (saveCourse) {
      return res.status(200).json({
        success: true,
        message: "course added successfully...",
        course: saveCourse,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "some error occured while adding course...",
    });
  }
}
async function getAllCourses(req, res) {
  try {
    const courseList = await Course.find({});
    if (courseList) {
      return res.status(200).json({
        success: true,
        message: "courses fetched successfully...",
        courseList,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "some error occured while fetching courses....",
    });
  }
}

async function updateCourseById(req, res) {
  const updateCourseData = req.body;
  const { id } = req.params;

  const updatedCourse = await Course.findByIdAndUpdate(id, updateCourseData, {
    new: true,
  });

  if (!updatedCourse) {
    return res
      .status(404)
      .json({ success: false, message: "course can't be updated..." });
  }
  res.status(200).json({
    success: true,
    message: "course updated successfully...",
    updatedCourse,
  });
}

async function getCourseDetailsById(req, res) {
  const { id } = req.params;

  const courseDetails = await Course.findById(id);

  if (!courseDetails) {
    return res
      .status(404)
      .json({ success: false, message: "course doesn't exists...." });
  }
  res.status(200).json({
    success: true,
    message: "course details fetched successfully...",
    courseDetails,
  });
}
async function deleteCourse(req, res) {
  const { id } = req.params;
  const deleted = await Course.findByIdAndDelete(id);
  // console.log(deleted,"isdeleted")
  if (deleted) {
    return res
      .status(200)
      .json({ success: true, message: "Course Deleted Successfully..." });
  } else {
    return res
      .status(404)
      .json({ success: false, message: "Error while deleting an Course..." });
  }
}

export {
  addNewCourse,
  getAllCourses,
  updateCourseById,
  getCourseDetailsById,
  deleteCourse,
};

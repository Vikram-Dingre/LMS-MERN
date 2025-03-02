import Course from "../../models/courseModel.js";
import StudentCourses from "../../models/studentCourses.js";
// async function getAllStudentViewCourses(req, res) {
//   try {
//     const coursesList = await Course.find({});
//     if (coursesList.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "no courses found" });
//     }
//     res
//       .status(200)
//       .json({ success: true, message: "courses fethed", coursesList });
//   } catch (error) {
//     return res
//       .status(404)
//       .json({ success: false, message: "some error occured." });
//   }
// }

async function getStudentViewCourseDetails(req, res) {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);
    if (!courseDetails) {
      return res
        .status(404)
        .json({ success: false, message: "no courses found for details." });
    }
    res.status(200).json({
      success: true,
      message: "course details fetched successfully.",
      courseDetails,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "some error occured." });
  }
}

async function getStudentViewCoursesList(req, res) {
  try {
    const {
      category,
      level,
      primaryLanguage,
      sortBy = "price-lowtohigh",
    } = req.query;

    //for single filter condition if one then

    // let filters = {};

    // if ((category)) {
    //   filters.category = { $in: category.split(",") };
    // }

    // if (level) {
    //   filters.level = { $in: level.split(",") };
    // }

    // if (primaryLanguage) {
    //   filters.primaryLanguage = { $in: primaryLanguage.split(",")};
    // }
    // console.log(filters, "filters from backand");
    // // try {
    // const coursesList = await Course.find(filters);
    // console.log(coursesList, "list");

    // if all filters are satisfied then , if all condition true then show courses

    let filters = [];

    if (category) {
      filters.push({ category: { $in: category.split(",") } });
    }
    if (level) {
      filters.push({ level: { $in: level.split(",") } });
    }
    if (primaryLanguage) {
      filters.push({ primaryLanguage: { $in: primaryLanguage.split(",") } });
    }
    let sortParams = {};
    switch (sortBy) {
      case "price-hightolow":
        sortParams.pricing = -1;
        break;
      case "title-atoz":
        sortParams.title = 1;
        break;
      case "title-ztoa":
        sortParams.title = -1;
        break;

      default:
        sortParams.pricing = 1;
        break;
    }

    const query = filters.length > 0 ? { $and: filters } : {};
    const coursesList = await Course.find(query).sort(sortParams);

    res.status(200).json({
      success: true,
      message: "courses fethed",
      coursesList,
    });
    // } catch (error) {
    //   console.log(error);
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "some error occured." });
    // }
  } catch (error) {}
}

async function fetchStudentPurchasedCoursesList(req, res) {
  try {
    const { userId } = req.params;
    const userCourses = await StudentCourses.findOne({ userId });
    if (!userCourses) {
      return res.status(404).json({
        success: false,
        message: "no purchased courses found for you.",
      });
    }
    // if(userCourses?.courses?.length === 0){
    // return res.status(404).json({
    //   success: false,
    //   message: "no purchased courses found for you.",
    // });

    // }

    return res.status(200).json({
      success: true,
      message: "student purchased coruses fetched successfully.",
      coursesList: userCourses.courses,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        "some error occured.while fetching student purchased courses list",
    });
  }
}

async function fetchStudentPurchasedCourseDetails(req, res) {
  try {
    const { courseId, userId } = req.params;
    const studentCourses = await StudentCourses.findOne({ userId: userId });

    if (!studentCourses) {
      return res.status(404).json({
        success: false,
        message: "student doesn't buy any course!",
      });
    }

    if (studentCourses?.courses?.length === 0) {
      return res.status(404).json({
        success: false,
        message: "student doesn't buy any course!",
      });
    }
    const purchasedCourse = studentCourses?.courses?.find(
      (course) => course.courseId === courseId
    );
    if (!purchasedCourse) {
      return res.status(404).json({
        success: false,
        message: "student not purchased this course!",
      });
    }

    return res.status(200).json({
      success: true,
      courseDetails: purchasedCourse,
      message: "purchased course details fetched successfully.",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        "some error occured. while fetching student purchased course details",
    });
  }
}

async function isCoursePurchased(req, res) {
  const { userId, courseId } = req.params;

  const studentCourses = await StudentCourses.findOne({ userId: userId });

  if (!studentCourses) {
    return res.status(200).json({
      success: false,
      message: "student doesn't buy any course!",
      isPurchased: false,
    });
  }

  if (studentCourses?.courses?.length === 0) {
    return res.status(200).json({
      success: false,
      message: "student doesn't buy any course!",
      isPurchased: false,
    });
  }
  const purchasedCourse = studentCourses?.courses?.find((course) => {
    return course.courseId === courseId;
  });

  if (!purchasedCourse) {
    return res.status(200).json({
      success: false,
      message: "student not purchased this course already!",
      isPurchased: false,
    });
  }
  return res.status(200).json({
    success: true,
    isPurchased: true,
    message: "student purchased this course already!",
  });
}

export {
  getStudentViewCoursesList,
  getStudentViewCourseDetails,
  fetchStudentPurchasedCoursesList,
  isCoursePurchased,
  fetchStudentPurchasedCourseDetails,
};

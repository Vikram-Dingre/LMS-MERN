import axiosInstance from "@/api/axios-instance";

export async function addNewCourseService(formData) {
  const { data } = await axiosInstance.post("/instructor/course/add", formData);
  return data;
}
export async function fetchInstructorCoursesService() {
  const { data } = await axiosInstance.get("/instructor/course/get");
  return data;
}
export async function fetchInstructorCourseDetailsService(id) {
  const { data } = await axiosInstance.get(
    `/instructor/course/get/details/${id}`
  );
  return data;
}
export async function updateInstructorCourseService(id, formData) {
  const { data } = await axiosInstance.put(
    `/instructor/course/update/${id}`,
    formData
  );
  return data;
}
export async function deleteInstructorCourseService(id) {
  const { data } = await axiosInstance.delete(
    `/instructor/course/delete/${id}`
  );
  return data;
}
export async function fetchStudentCoursesListService(query) {
  const { data } = await axiosInstance.get(`/student/course/get?${query}`);
  return data;
}
export async function fetchStudentCourseDetailsService(id) {
  const { data } = await axiosInstance.get(`/student/course/get/details/${id}`);
  return data;
}
export async function fetchStudentPurchasedCourseDetails(userId, courseId) {
  const { data } = await axiosInstance.get(
    `student/course/purchased/get/details/${userId}/${courseId}`
  );
  return data;
}
export async function fetchPurchasedCoursesList(userId) {
  const { data } = await axiosInstance.get(
    `/student/course/purchased/get/${userId}`
  );
  return data;
}
export async function isCourseAlreadyPurchasedService(userId, courseId) {
  const { data } = await axiosInstance.get(
    `/student/course/isPurchased/${userId}/${courseId}`
  );
  return data;
}
export async function markdCurrentLectureAsViewed(userId, courseId, lectureId) {
  const { data } = await axiosInstance.get(
    `/student/course/progress/markAsViewed/${userId}/${courseId}/${lectureId}`
  );
  return data;
}
export async function resetCurrentCourseProgress(userId, courseId) {
  const { data } = await axiosInstance.get(
    `/student/course/progress/resetProgress/${userId}/${courseId}`
  );
  return data;
}

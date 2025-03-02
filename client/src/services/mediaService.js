import axiosInstance from "@/api/axios-instance";

async function uploadMediaService(formData) {
  const { data } = await axiosInstance.post("/media/upload", formData);
  return data;
}

async function deleteMediaService(id) {
  const { data } = await axiosInstance.delete(`/media/delete/${id}`);
  return data;
}

export { uploadMediaService, deleteMediaService };

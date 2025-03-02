import axiosInstance from "@/api/axios-instance";
async function getKeyService() {
  const { data } = await axiosInstance.get("/api/getkey");
  return data;
}

export default getKeyService;

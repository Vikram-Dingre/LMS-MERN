import axiosInstance from "@/api/axios-instance";

export async function signupService(formData) {
  const { data } = await axiosInstance.post("/auth/signup", formData);
  return data;
}

export async function loginService(formData) {
  const { data } = await axiosInstance.post("/auth/login", formData);
  return data;
}
export async function checkAuthService() {
  const { data } = await axiosInstance("/auth/check-auth");
  return data;
}

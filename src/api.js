import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Backend URL
  withCredentials: true,
});

export const sendOTP = (email) => API.post("/api/auth/send-otp", { email });
export const verifyOTP = (email, otp) => API.post("/api/auth/verify-otp", { email, otp });
export const getStudents = () => API.get("/api/student");

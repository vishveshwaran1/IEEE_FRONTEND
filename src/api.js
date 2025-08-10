import axios from "axios";

const api = axios.create({
    baseURL: "https://ieee-backend-1-82p1.onrender.com", // Backend URL
    timeout: 10000,
});

export const sendOTP = (email) => api.post("/api/auth/send-otp", { email });
export const verifyOTP = (email, otp) => api.post("/api/auth/verify-otp", { email, otp });
export const getStudents = () => api.get("/api/student");

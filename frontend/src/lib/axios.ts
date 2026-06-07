import axiox from "axios";

const axiosInstance=axiox.create({
    baseURL:import.meta.env.VITE_API_URL || "http://localhost:5186/api",
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
});

export default axiosInstance;
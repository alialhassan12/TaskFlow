import axiox from "axios";

const axiosInstance=axiox.create({
    baseURL:import.meta.env.VITE_API_URL || "http://localhost:5186/api",
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem('token');
        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

export default axiosInstance;
import axios from "axios"
import {BASE_URL} from "./apiPath"

const axiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout:80000,
    headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
    }
});

//Request Interceptor

axiosInstance.interceptors.request.use(
    (config) =>{
        const accessToken = localStorage.getItem('token');
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
)

//Response Interceptor
axiosInstance.interceptors.response.use(
    (response) =>{
        return response;
    },
    (error) =>{
        //Hanlde global errors commonly
        if(error.response){
            if(error.response.status === 401){
                //Redirect to login page//
                window.location.href = "/login";
            }else if(error.response.status === 500){
                console.log("Server error please try again later");
            }
        }else if(error.code === "ECONNABORTED"){
            console.log("Timeout error please try again later");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
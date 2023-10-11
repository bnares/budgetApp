import { responsiveFontSizes } from "@mui/material";
import axios from "axios";
const axiosInterceptorsSetup = navigate =>{
    axios.interceptors.response.use(response=>{ return response},
        error=>{
            console.log("interceptors")
            console.log(error)
            if(error.response.status===401){
                navigate("/api/unauthorized")
            }else if(error.response.status===400){
                navigate("/api/error");
            }else{
                navigate("/api/error");
            }
            return Promise.reject(error);
        })
}

export default axiosInterceptorsSetup;
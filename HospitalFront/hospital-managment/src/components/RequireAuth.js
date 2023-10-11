import { useNavigate, useLocation,Navigate } from "react-router-dom";
import { useAuth } from "./UseContext";
import Unauthorized from "../pages/unauthorized/Unauthorized";
import React from 'react'

function RequireAuth({children,allowedRoleId}) {
    var location = useLocation();
    //var navigation = useNavigate();
    var auth = useAuth();
    
    if(auth.user==null){
      console.log("in RequireAuth user role is null: ");
      console.log(auth.user);
        return(
            
            //navigation("/api/Auth/login")
            <Navigate to="/api/Auth/login" />
        )
    }else if(parseInt(auth.user.role)!=allowedRoleId){
        console.log("User role is not null");
        console.log(auth.user);
        return(
          //navigation("/api/unauthorized")
          <Navigate to="/api/unauthorized" state={{from:location}} replace />
        )
    }else{
      return (
        children
      )
    }
  
}

export default RequireAuth
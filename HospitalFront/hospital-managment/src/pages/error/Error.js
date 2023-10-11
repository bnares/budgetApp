import { Box } from '@mui/material';
import React from 'react'
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../components/UseContext.js";
function Error() {
    const [errorInfo, setErrorInfo] = React.useState("");
    const navigate = useNavigate();
    const goBack = () => {auth.resetError(); auth.logout(); navigate(-1)};
    const auth = useAuth();
    console.log("JESTES w ERRORZE!!!!")
    React.useEffect(()=>{
        setErrorInfo(auth.error)
        auth.resetError()
    },[]);
    return (
        <>
        {console.log("twoje errory")}
        {console.log(auth.error)}
        <Box style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            <h1 style={{background:"red", padding:"10px"}}>Error</h1>
            <br />
            <p>Error occured: {errorInfo}</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
            
        </Box>
        </>
    )
  
}

export default Error
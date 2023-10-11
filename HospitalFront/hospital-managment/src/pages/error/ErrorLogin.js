import React from 'react'
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../components/UseContext.js";
function Error() {
    const [errorInfo, setErrorInfo] = React.useState("");
    const navigate = useNavigate();
    const goBack = () => navigate("/api/Auth/login");
    const auth = useAuth();
    React.useEffect(()=>{
        setErrorInfo(auth.errorLogin)
        auth.resetErrorLogin()
    },[]);
    return (
        <section style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            <h1 style={{background:"red", padding:"10px"}}>Error</h1>
            <br />
            <p>Error occured: {errorInfo}</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
  
}

export default Error
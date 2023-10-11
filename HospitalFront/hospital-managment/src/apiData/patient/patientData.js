import { ENDPOINTS, createApiEndpoint } from "../../appi/Api.js";

export const getPatientsData = async (setPatientData, setError,token)=>{
    try{
        await createApiEndpoint(ENDPOINTS.getPatientData,token).fetchAll().then(response=>{
            if(response.data.success){
                setPatientData(response.data.data);
            }else{
                setError(response.data.message);
            }
        })
    }catch(err){
        if(err.response){
            setError("response Error during loading the page "+err.message);
        }else if(err.request){
            setError("request Error during loading the page "+err.message);
        }else{
            setError("Sth went wrong "+err.message);
        }
    }
}

export const getPatientWard = async (setWardData, setError, token,wardId)=>{
    try{
        await createApiEndpoint(ENDPOINTS.getPatientWard,token).fetchByDifrentId(wardId).then(response=>{
            if(response.data.success){
                setWardData(response.data.data);
            }else{
                setError(response.data.message);
            }
        })
    }catch(err){
        if(err.response){
            setError("response Error during loading the page "+err.message);
        }else if(err.request){
            setError("request Error during loading the page "+err.message);
        }else{
            setError("Sth went wrong "+err.message);
        }
    }
}

export const getPatientCard = async (setPatientCard,setError, token)=>{
    try{
        await createApiEndpoint(ENDPOINTS.getPatientCard,token).fetchByUserId().then(response=>{
            if(response.data.success){
                setPatientCard(response.data.data);
            }else{
                setError(response.data.message);
            }
        })
    }catch(err){
        if(err.response){
            setError("response Error during loading the page "+err.message);
        }else if(err.request){
            setError("request Error during loading the page "+err.message);
        }else{
            setError("Sth went wrong "+err.message);
        }
    }
}
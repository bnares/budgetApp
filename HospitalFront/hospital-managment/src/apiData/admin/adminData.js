import { ElevatorSharp } from "@mui/icons-material";
import React from "react";
import { ENDPOINTS, createApiEndpoint } from "../../appi/Api.js";

export const getWardsNotAsignedToSelectedHospital = async (setNotYetAsignedWards, setError,token,hospitalId)=>{
    try{

        await createApiEndpoint(ENDPOINTS.getWardsNotAsignedToSelectedHospital,token).fetchByDifrentId(hospitalId).then(resp=>{
            if(resp.data.success){
                var wardData = [];
                resp.data.data.forEach(element => {
                    var dataToFeed = {id:element.id, title : element.title};
                    wardData = [...wardData, dataToFeed];
                });

                setNotYetAsignedWards(wardData);
            }else{
                setError("Crazy Error: "+resp.data.message)
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

export const getAllHospitalsWard = async (setError,token,hospitalId,setHospitalsWard) =>{
    try{
        await createApiEndpoint(ENDPOINTS.getHospitalWards,token).fetchByDifrentId(hospitalId).then(resp=>{
            if(resp.data.success){
                setHospitalsWard(resp.data.data);
            }else{
                setError("Crazy Error: "+resp.data.message);
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

export const updateWard = async (setError,token,dataToFeed, setUpdateWardStatus)=>{
    try{
        await createApiEndpoint(ENDPOINTS.updateWard,token).updateWard(dataToFeed).then(resp=>{
            console.log("response: ");
            console.log(resp);
            if(resp.data.success){
                setUpdateWardStatus({isOpen:true, message:resp.data.message, type:"success"})
            }else{
                setError("Some crazy Error: "+resp.data.message);
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

export const addWardToHospital = async (setError,token,dataToPost,addWardStatus)=>{

    try{
        await createApiEndpoint(ENDPOINTS.addWardToHospital,token).postNewData(dataToPost).then(resp=>{
            if(resp.data.success){
                if(resp.data.message=="Ward Already Exist in this Hospital"){
                    addWardStatus({isOpen:true, message:resp.data.message, type:"info"})
                }else{
                    addWardStatus({isOpen:true, message:resp.data.message, type:"success"})
                }
            }else{
                setError("Some crazy Error: "+resp.data.message);
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

export const getDoctorsData = async (setDoctorsData,setError,token,setDisplayCharts)=>{
    try{
        await createApiEndpoint(ENDPOINTS.getAdminsDoctorsData,token).fetchAll().then(resp=>{
            if(resp.data.success){
                setDoctorsData(resp.data.data);
                setDisplayCharts(true);
            }else{
                setError("Crazy error: "+resp.data.message);
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

export const getAllHospitals = async(setError,token,setRegisteredHospitals)=>{
    try{
        await createApiEndpoint(ENDPOINTS.allRegisteredHospitals,token).fetchAll().then((resp)=>{
            if(resp.data.success){
                var hospitalData = [];
                resp.data.data.forEach(element => {
                    var dataToFeed = {id:element.hospitalId, title : element.name};
                    hospitalData = [...hospitalData, dataToFeed];
                });

                setRegisteredHospitals(hospitalData);
            }else{
                setError("Sth went wrong, "+resp.data.message);
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

export const AddNewHospital = async(setError,token, hospitalData, setHospitalStatusInfo)=>{
    try{
        await createApiEndpoint(ENDPOINTS.addNewHospital, token).addNewHospital(hospitalData).then(resp=>{
            if(resp.data.success){
                if(resp.data.message=="Such Hospital Already Exist"){
                    setHospitalStatusInfo({isOpen:true, message:resp.data.message, type:"info"})
                }else{
                    setHospitalStatusInfo({isOpen:true, message:resp.data.message, type:"success"})
                }
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

export const GetDoctorDataBasedOnPatientId = async(setPatientDoctor,setError, token,patientId)=>{
    try{
        await createApiEndpoint(ENDPOINTS.getDoctorsDataBasedOnPatietnId,token).fetchByDifrentId(patientId).then(resp=>{
            if(resp.data.success){
                setPatientDoctor(resp.data.data);
            }else{
                setError("Crazy error: "+resp.data.message);
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

export const GetAdminsAllDoctorsNumbers = async (setAllDoctorsRegisteredData,setError,token)=>{
    try{
        await createApiEndpoint(ENDPOINTS.getAdminAllDoctors,token).fetchAll().then(resp=>{
            if(resp.data.success){
                setAllDoctorsRegisteredData(resp.data.data);
            }else{
                setError("Crazy error: "+resp.data.message);
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

export const GetAdminsPatientsNumbers = (setAllPatientsRegisteredData, setError, token)=>{
    try{
       createApiEndpoint(ENDPOINTS.getAdminAllPatients,token).fetchAll().then(resp=>{
            if(resp.data.success){
                setAllPatientsRegisteredData(resp.data.data);
            }else{
                setError("Crazy error: "+resp.data.message);
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

export const GetGeneralHospitalsOccupation = (setGeneralHospitalsOccupation, setError, token)=>{
    try{
        createApiEndpoint(ENDPOINTS.getOccupationOfHospitals, token).fetchAll().then(resp=>{
            if(resp.data.success){
                setGeneralHospitalsOccupation(resp.data.data);
            }else{
                setError("Crazy error: "+resp.data.message);
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

export const GetSortedByDatesAllNotes = (setSortedAllNotes, setError, token)=>{
    try{
        createApiEndpoint(ENDPOINTS.getSortedByDatesNotesForAdmin,token).fetchAll().then(resp=>{
            if(resp.data.success){
                setSortedAllNotes(resp.data.data);
            }else{
                setError("Crazy error: "+resp.data.message);
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

export const UpdateHospitalBasicDataFromAdmin = async (setError,token,dataToFeed,setHospitalStatusInfo)=>{
    try{
        await createApiEndpoint(ENDPOINTS.updateHospitaBasicDataFromAdmin,token).updateBasicHospitalDataFromAdmin(dataToFeed).then(resp=>{
            if(resp.data.success){
                console.log(resp);
                setHospitalStatusInfo({isOpen:true, type:'success', message:resp.data.message});
            }
            else setError("Crazy Error: "+resp.data.message);
        })
    }catch(err){
        if(err.response){
            setError("responseError during loading data "+err.message);
        }else if(err.request){
            setError("request error "+err.message);
        }else{
            setError("Sth went wrong "+err.message);
        }
    }
}

export const GetHospitalById = async (setError,token,hospitalId,setSelectedHospitalData)=>{
    try{
        
        await createApiEndpoint(ENDPOINTS.getHospitalById,token).fetchByDifrentId(hospitalId).then(resp=>{
            if(resp.data.success) setSelectedHospitalData(resp.data.data);
            else setError("Crazy Error: "+resp.data.message);
        })
    }catch(err){
        if(err.response){
            setError("responseError during loading data "+err.message);
        }else if(err.request){
            setError("request error "+err.message);
        }else{
            setError("Sth went wrong "+err.message);
        }
    }
}
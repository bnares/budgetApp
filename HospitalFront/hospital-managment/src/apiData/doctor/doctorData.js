import React from "react";
import { ENDPOINTS, createApiEndpoint } from "../../appi/Api.js";

export const doctorsHospitals = async (setNewHospitalList,setErrorLogin,token)=>{
    try{
        let hospitals = await createApiEndpoint(ENDPOINTS.doctorsHospitals,token).fetchByUserId();
        setNewHospitalList(hospitals.data.data);
    }catch(err){
        if(err.response){
            setErrorLogin("response Error during loading the page "+err.message);
        }else if(err.request){
            setErrorLogin("request Error during loading the page "+err.message);
        }else{
            setErrorLogin("Sth went wrong "+err.message);
        }
    }
}

export const doctorsPatients = async (setPatientsList,setErrorLogin,token)=>{
    
    try{
        let resp = await createApiEndpoint(ENDPOINTS.doctorsPatients,token).fetchByUserId();
        setPatientsList(resp.data.data);
        
    }catch(err){
        if(err.response){
            setErrorLogin("response Error during loading the page "+err.message);
        }else if(err.request){
            setErrorLogin("request Error during loading the page "+err.message);
        }else{
            setErrorLogin("Sth went wrong "+err.message);
        }
    }
}

export const getOneDoctorPatient = async (setPatient,setError,token,patientId)=>{
    try{        
        await createApiEndpoint(ENDPOINTS.getDoctorOnePatient,token).getOneDoctorPatient(patientId).then(response=>{
            setPatient(response.data.data);
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

export const getNotAsignedPatients = async (setNotAsignedPatients,setErrorLogin,token)=>{
    try{
        await createApiEndpoint(ENDPOINTS.getNotAsignedPatients,token).fetchAll().then(resp=>{
            setNotAsignedPatients(resp.data.data);
        })
    }catch(err){
        if(err.response){
            setErrorLogin("response Error during loading the page "+err.message);
        }else if(err.request){
            setErrorLogin("request Error during loading the page "+err.message);
        }else{
            setErrorLogin("Sth went wrong "+err.message);
        }
    }
}
                                      
export const getPatientsCard = async (setChoosenPatientGridTableData,setError,patientId,token)=>{
    try{
        //let resp = await createApiEndpoint(ENDPOINTS.patientCard,token).fetchByDifrentId(patientId).then((resp)=>(setChoosenPatientGridTableData(resp.data.data)));
        await createApiEndpoint(ENDPOINTS.patientCard,token).fetchByDifrentId(patientId).then((resp)=>{
            if(resp.data.success){
                setChoosenPatientGridTableData({...resp.data.data,patientId:patientId});
            }else{
                setError("Crazy error: "+resp.data.message);
            }
            
        });
        
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

export const updatePatientsCard = async (dataToUpdate,setError, token,setOpenPopup,setOpenPatientCardNotification)=>{
    try{
        
        await createApiEndpoint(ENDPOINTS.updatePatientCard,token).updatePatientCard(dataToUpdate).then((resp)=>{
            console.log(resp);
            if(resp.data.success){
                setOpenPopup(false)
                setOpenPatientCardNotification({isOpen:true, message:resp.data.message, type:"success"})
            }else{
                setOpenPopup(false)
                setOpenPatientCardNotification({isOpen:true, message:resp.data.message, type:"info"})
            }
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

export const newUserCredentials = async (credentials,setError,token,setOpenNotificationUserCredentials,setOpenpopup) =>{
    try{
        await createApiEndpoint(ENDPOINTS.newUserCredentials,token).updateUserCredentials(credentials).then(response=>{
            if(response.data.data){
                setOpenpopup(false);
                setOpenNotificationUserCredentials({isOpen:true, message:response.data.message, type:'success'})
            }else{
                setOpenpopup(false);
                setOpenNotificationUserCredentials({isOpen:true, message:response.data.message, type:'error'})
            }
        })
    }catch(err){
        if(err.response){
            setError("response error "+err.message);
        }else if(err.request){
            setError("requestError "+err.message);
        }else{
            setError("Sth went wrong "+err.message);
        }
        
    }
}

export const deleteDoctorsHospital = async (hospitalId,setError,token, setNotificationWindow)=>{
    try{
        
        await createApiEndpoint(ENDPOINTS.deleteDoctorsHospital,token).deleteDoctorHospital(hospitalId).then(response=>{
            if(response.data.success){
                setNotificationWindow({isOpen:true, message:response.data.message, type:'success'});
                
            }else{
                setNotificationWindow({isOpen:true, message:response.data.message, type:'error'});
                
            }
        })
    }catch(err){
        
        if(err.response.status===401){
            setError("response error "+err.message)
        }else if(err.request){
            setError("request error "+err.message)
        }else{
            setError("set went wrong "+err.message)
        }
    }
}

export const getAllAvailableRegisteredHospitals = async (setError,token, setAllRegisteredHospitalsList,setNotify) =>{
    try{
        setAllRegisteredHospitalsList([]);
        await createApiEndpoint(ENDPOINTS.allRegisteredHospitals,token).fetchAll().then(response=>{
            //console.log("AllHospitals in getAllAvailbale jospitals");
            //console.log(response);
            if(response.data.success){
                
                setAllRegisteredHospitalsList(response.data.data);
            }else{
                setNotify({isOpen:true, message:response.data.message, type:"error"})
            }
        })
    }catch(err){
        if(err.response.status===401 || err.response.status===400){
            setError("response error "+err.message);
        }else{
            setError("sth went wrong "+err.message);
        }
    }
}

export const addNewHospitalToDoctor = async (setError,token,setOpenConfirmAddNewHospitalWindow,clickedHospitalToAdd,addHispitalToUseContextList,setAddingNewHospitalNotification)=>{
    try{
        await createApiEndpoint(ENDPOINTS.addNewHospitalToDoctor,token).addNewHospitalToDoctor(clickedHospitalToAdd.id).then(response=>{
            
            if(response.data.success){
               
                if(response.data.message!="Such Hospital already on Your List"){
                    addHispitalToUseContextList({hospitalId:clickedHospitalToAdd.id,country:clickedHospitalToAdd.country,name:clickedHospitalToAdd.name,street:clickedHospitalToAdd.street,city:clickedHospitalToAdd.city});
                    setAddingNewHospitalNotification({isOpen:true, message:response.data.message, type:"success"});
                }else{
                    setAddingNewHospitalNotification({isOpen:true, message:response.data.message, type:"warning"});
                }
                setOpenConfirmAddNewHospitalWindow({isOpen:false, title:"", subtitle:""});
            }else{
                setError("sth went wring, "+response.message);
            }
        })
    }catch(err){
        if(err.response.status==401 || err.response.status==400){
            setError("response error "+err.message);
        }else{
            setError("sth went wrong "+err.message);
        }
    }
}

export const getAllDoctorsWards =async (setError,token,setDoctorsWards)=>{
    try{
        await createApiEndpoint(ENDPOINTS.getAllDoctorsWards,token).fetchByUserId().then(response=>{
            
            setDoctorsWards([]);
            if(response.data.success){
                setDoctorsWards(response.data.data);
            }
        })
    }catch(err){
        if(err.response.status==401 || err.response.status==400){
            setError("response error "+err.message);
        }else{
            setError("sth went wrong "+err.message);
        }
    }
}

export const getAllRegisteredWardsName = async (setError,token,setAllWardsNames)=>{
    try{
        await createApiEndpoint(ENDPOINTS.getAllRegisteredWardsName,token).fetchAll().then(response=>{
            setAllWardsNames([]);
            if(response.data.success){
                for(let i =0; i<response.data.data.length;i++){
                    setAllWardsNames(prev=>[...prev,{id:i,name:response.data.data[i]}]);
                }
            }
        })

    }catch(err){
        if(err.response.status==401 || err.response.status==400){
            setError("response error "+err.message);
        }else{
            setError("sth went wrong "+err.message);
        }
    }
}

export const removeWardFromDoctor = async (setError,token,id,setLoading,setSuccess,setDeleteWardNotifications)=>{
    
    try{
        setLoading(true)
        await createApiEndpoint(ENDPOINTS.removeWardFromDoctor,token).removeWardFromDoctor(id).then(response=>{
            setLoading(false)
            if(response.data.success){
                setSuccess(true);
                setDeleteWardNotifications({isOpen:true, message:response.data.message, type:"success"})
                
            }else{
                setSuccess(false);
                setDeleteWardNotifications({isOpen:true, message:response.data.message, type:"error"})
            }
        })
    }catch(err){
        if(err.response.status==401 || err.response.status==400){
            setError("response error "+err.message);
        }else{
            setError("sth went wrong "+err.message);
        }
    }

}

export const addNewWardToDoctorsHospital = async (setError, token, hospitalId, wardId, setAddWardNotification)=>{
    try{
        await createApiEndpoint(ENDPOINTS.addNewWardToDoctorsHospital,token).addWardToDoctor(hospitalId,wardId).then(response=>{
            if(response.data.success){
                if(response.data.message=="You Can Work only in One Ward in each Hospital"||response.data.message.endsWith(" already On Your List")){
                    setAddWardNotification({isOpen:true, message:response.data.message, type:"info"});
                                            
                }else{
                    setAddWardNotification({isOpen:true, message:response.data.message, type:"success"})
                }
                
            }else if(response.data.success==false){
                setAddWardNotification({isOpen:true, message:response.data.message, type:"error"})
            }else{
                setError("crazy error: "+response.data.message);
            }
        })
    }catch(err){
        if(err.response.status==401 || err.response.status==400){
            setError("response error "+err.message);
            setAddWardNotification({isOpen:true, message:err.message, type:"error"});
        }else{
            setError("sth went wrong "+err.message);
        }
    }
}

export const addNewPatientToDoctor = async (setError, token,patientId, hospitalId, wardId, setAddPatientNotification)=>{
    try{
        await createApiEndpoint(ENDPOINTS.addNewPatient,token).addNewPatient(patientId,hospitalId,wardId).then(response=>{
            if(response.data.success){
                if(response.data.message=="You Can Work only in One Ward in each Hospital"||response.data.message.endsWith(" already On Your List")){
                    setAddPatientNotification({isOpen:true, message:response.data.message, type:"info"});
                                            
                }else{
                    setAddPatientNotification({isOpen:true, message:response.data.message, type:"success"})
                }
            }else if(response.data.success==false){
                setAddPatientNotification({isOpen:true, message:response.data.message, type:"error"})
            }else{
                setError("crazy error: "+response.data.message);
            }
        })
    }catch(err){
        if(err.response.status==401 || err.response.status==400){
            setError("response error "+err.message);
            setAddPatientNotification({isOpen:true, message:err.message, type:"error"});
        }else{
            setError("sth went wrong "+err.message);
        }
    }
}

export const removePatientFromDoctor= async (setError, token,patientId,setAddPatientNotification) =>{
    try{
        await createApiEndpoint(ENDPOINTS.removePatientFromDoctor,token).removePatientFromDoctor(patientId).then(response=>{
            if(response.data.success){
                setAddPatientNotification({isOpen:true, message:response.data.message, type:"success"});
            }else{
                setAddPatientNotification({isOpen:true, message:response.data.message, type:"error"});
            }
        })
    }catch(err){
        if(err.response.status==401 || err.response.status==400){
            setError("response error "+err.message);
            //setAddPatientNotification({isOpen:true, message:err.message, type:"error"});
        }else{
            setError("sth went wrong "+err.message);
        }
    }
}

export const addPatientNote = async (setError,token,patientId, noteData,setAddNoteNotification)=>{
    try{
        let dataToSend = {record:noteData.record, date:noteData.date}
        await createApiEndpoint(ENDPOINTS.addNewNoteToPatient,token).addPatientNote(patientId,dataToSend).then(response=>{
            if(response.data.success){
                setAddNoteNotification({isOpen:true, message:response.data.message, type:"success"});
            }else{
                setAddNoteNotification({isOpen:true, message:response.data.message, type:"error"});
            }
        })
    }catch(err){
        console.log("err in addNewNote");
        console.log(err);
        if(err.response.status==401 || err.response.status==400){
            setError("response error "+err.message);
        }else{
            setError("sth went wrong "+err.message);
        }
    }
}





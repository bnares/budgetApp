import axios from "axios";

const BaseUrl = "https://localhost:7118/api/";

export const ENDPOINTS ={
    register:"Auth/register",
    login:"Auth/login",
    doctorsPatients:"Doctor/getAllDoctorsPatients",
    removePatientFromDoctor:"Doctor/removePatient",
    doctorsHospitals:"Doctor/getAllDoctorsHospitals",
    patientCard: "Doctor/patientsCard",
    updatePatientCard: "Doctor/updatePatientNote",
    newUserCredentials:"Doctor/updateCredentials",
    deleteDoctorsHospital:"Doctor/removeHospital",
    addNewHospitalToDoctor:"Doctor/addHospital",
    getAllDoctorsWards: "Doctor/getAllWard",
    getAllRegisteredWardsName: "Doctor/getAllNamesOfWards",
    removeWardFromDoctor:"Doctor/removeWard",
    addNewWardToDoctorsHospital:"Doctor/AddWard",
    getNotAsignedPatients:"Doctor/getNotAisgnedPatients",
    addNewPatient:"Doctor/AddPatient",
    getDoctorOnePatient:"Doctor/getPateint",
    addNewNoteToPatient:"Doctor/addPatientNote",
    getPatientData : "Patient/PatientData",
    getPatientWard: "Patient/PatientWard",
    getPatientCard: "Patient/PatientCard",
    getAdminsDoctorsData: "Admin/GetDoctorsData",
    getDoctorsDataBasedOnPatietnId:"Admin/GetPatientsDoctor",
    getAdminAllDoctors: 'Admin/getAllDoctors',
    getAdminAllPatients: 'Admin/getAllPatients',
    getOccupationOfHospitals:'Admin/GetGeneralHospitalsOccupation',
    getSortedByDatesNotesForAdmin:'Admin/GetAllNotesRegistered',
    addNewHospital:'Hospital/addNewHospital',
    allRegisteredHospitals:"Hospital/getAllHospitals",
    getHospitalById:"Hospital/getHospital",
    updateHospitaBasicDataFromAdmin:"Hospital/Admin/UpdateHospital",
    getWardsNotAsignedToSelectedHospital:"Ward/GetNotAsignedWardsToHospital",
    addWardToHospital:"Ward/addWard",
    getHospitalWards:"Ward/getWardsAddedToHospital",
    updateWard:"Ward/updateWard",
                                    
}                          

export const createApiEndpoint = (endpoint, token)=>{
    let url = BaseUrl+endpoint+"/";
    return{
        fetchAll: ()=>axios.get(url,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }), //fetchById: (id)=>axios.get(url+id),
        fetchByUserId: ()=>axios.get(url,{
            headers:{
                "Authorization": `Bearer ${token}`,
            }
        }),
        fetchByDifrentId: (id)=>axios.get(url+id,{
            headers:{
                "Authorization":`Bearer ${token}`,
            }
        }),
        create: newRecord=>axios.post(url,newRecord),
        updatePatientCard: (cardModification)=>axios.post(url,cardModification,{
            headers:{
                "Authorization":`Bearer ${token}`
            },
            //body:JSON.stringify(cardModification)
        }),
        updateUserCredentials: credentials =>axios.put(url,credentials,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }),
        deleteDoctorHospital: (id)=>axios.delete(url+id,{
            headers:{
                //'Content-Type' : 'application/json',
                //'Accept' : 'application/json',
                "Authorization":`Bearer ${token}`
            }
        }),
        addNewHospitalToDoctor:(id)=>axios.post(`${url}${id}`,null,{
            headers:{
                'accept': 'text/plain',
                "Authorization":`Bearer ${token}`
            }
        }),
        removeWardFromDoctor:(id)=>axios.delete(url+id,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
            
        }),
        addWardToDoctor:(hospitalId,wardId)=>axios.post(url+hospitalId+"/"+wardId,null,{
            headers:{
                'accept': 'text/plain',
                "Authorization":`Bearer ${token}`
            }
        }),
        addNewPatient:(patientId,hospitalId,wardId)=>axios.put(url+patientId+"/"+hospitalId+"/"+wardId,null,{
            headers:{
                'accept': 'text/plain',
                "Authorization":`Bearer ${token}`
            }
        }),
        removePatientFromDoctor:(patientId)=>axios.put(url+patientId,null,{
            headers:{
                'accept': 'text/plain',
                "Authorization":`Bearer ${token}`
            }
        }),
        getOneDoctorPatient:(patientId)=>axios.get(url+patientId,{
            headers:{
                'accept': 'text/plain',
                "Authorization":`Bearer ${token}`
            }
        }),
        addPatientNote:(patientId,noteData)=>axios.post(url+patientId,noteData,{
            headers:{
                'accept': 'text/plain',
                "Authorization":`Bearer ${token}`
            }
        }),
        addNewHospital:(hospitalData)=>axios.post(url,hospitalData,{
            headers:{
                'accept': 'text/plain',
                "Authorization":`Bearer ${token}`
            }
        }),
        addWardToHospital:(hospitalId, wardName)=>axios.put(url+hospitalId+"/"+wardName,null,{
            headers:{
                'accept': 'text/plain',
                "Authorization":`Bearer ${token}`
            }
        }),
        updateWard:(dataToFeed)=>axios.put(url,dataToFeed,{
            headers:{
                'accept': 'text/plain',
                "Authorization":`Bearer ${token}`
            }
        }),
        updateBasicHospitalDataFromAdmin:(dataToFeed)=>axios.put(url,dataToFeed,{
            headers:{
                'accept': 'text/plain',
                "Authorization":`Bearer ${token}`
            }
        }),
        postNewData:(dataToPost)=>axios.post(url,dataToPost,{
            headers:{
                'accept': 'text/plain',
                "Authorization":`Bearer ${token}`
            }
        }),
        update: (id,updateRecord)=>axios.put(url+id, updateRecord),
        delete: (id)=>axios.delete(url+id)
    }
}
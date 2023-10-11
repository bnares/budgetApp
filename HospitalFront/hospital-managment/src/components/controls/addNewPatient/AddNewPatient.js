import { Grid } from '@mui/material'
import React from 'react'
import {UseForm, Form} from "../../UseForm";
import Input from '../Input';
import {useAuth} from "../../UseContext";
import Select from '../Select';
import {getAllAvailableRegisteredHospitals,getAllRegisteredWardsName, addNewPatientToDoctor,doctorsPatients,doctorsHospitals,getOneDoctorPatient} from "../../../apiData/doctor/doctorData"
import Button from '../Button';
import Notification from '../../Notification';


function AddNewPatient(props) {
  const {clickedPatientData,setOpenAddPatientWindow} = props;
  const auth = useAuth();
  const [hospitalOptions, setHospitalOptions] = React.useState([]);
  let [wardOptions, setWardOptions] = React.useState([]);
 
  //--------------------------------------------------------------------
  const [allWardsNames,setAllWardsNames] = React.useState([]);
  const [allRegisteredHospitals,setAllRegisteredHospitals] = React.useState([]);
  const [allRegisteredHospitalsErrornotification, setAllRegisteredHospitalsErrornotification] = React.useState({isOpen:false, message:"", type:"error"})
  const [getWardsInSelectedHospital, setGetWardsInSelectedHospital] = React.useState([]);
  const initialValues =  {name:clickedPatientData.name, surname:clickedPatientData.surname,age:clickedPatientData.age ,patientId:clickedPatientData.id,hospitalId:"", wardId:""};
  const [disabledSelectHospitalWard, setDisabledSelectHospitalWard] = React.useState(true);
  const [errorValues, setErrorValues] = React.useState({});
  const [addPatientNotification, setAddPatientNotification] = React.useState({isOpen:false, message:"", type:"error"});
  const [hospitalsData, setHospitalsData] = React.useState([]);
  const {values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleReset} = UseForm(initialValues);

  const submitForm = (e)=>{
    e.preventDefault()
    if(validateForm()){
        handleReset();
        addNewPatientToDoctor(auth.setError,auth.token,values.patientId,values.hospitalId,values.wardId,setAddPatientNotification);
    }
  }

const validateForm = ()=>{
    let errorForm = {};
    errorForm.hospitalId = values.hospitalId!=""?"":"Fill in Hospital Field";
    errorForm.wardId = values.wardId!=""?"":"Fill in Ward Field";
    
    setErrors(errorForm);
    return Object.values(errorForm).every(key=>key=="");
  }

  const prepareHospitalList = ()=>{
    let hospitals = [];
    auth.hospitalsList.forEach(element => {
        let hospital = {id:null, title:""};
        hospital.id = element.hospitalId;
        hospital.title = element.name;
        hospitals.push(hospital);
    });
    setHospitalOptions(hospitals);
  }

  const organizeWardDataToDisplayInForm = ()=>{
    setWardOptions([]);
    let temporaryData = [];
    hospitalsData.forEach(yourPatientData=>{
        let wardAsignedToDoctorInHospital = {wardNameId:"", wardId:"", hospitalId:""};
        wardAsignedToDoctorInHospital.wardId = yourPatientData.wards[0].wardId;
        wardAsignedToDoctorInHospital.wardNameId = yourPatientData.wards[0].wardNameAsEnumNumber;
        wardAsignedToDoctorInHospital.hospitalId = yourPatientData.wards[0].hospitalId;
        temporaryData.push(wardAsignedToDoctorInHospital);
    })
    let asignedWardToHiospitalWhereDoctorWorks = [];
    temporaryData.forEach(wardAsignedToDoctorInHospital=>{
        let wardStringName =  auth.allRegisteredApplicationWards.find(ward=>ward.id==wardAsignedToDoctorInHospital.wardNameId).name;
        let wardOption = {id:wardAsignedToDoctorInHospital.wardId, title:wardStringName};
        let hospitalIdWhereWardExist = wardAsignedToDoctorInHospital.hospitalId;
        asignedWardToHiospitalWhereDoctorWorks.push({hospitalId:hospitalIdWhereWardExist, wards:[wardOption]});
    })
    setWardOptions(prev=>[...prev, asignedWardToHiospitalWhereDoctorWorks]);
}

const getProperWard = (hospitalId)=>{
    wardOptions[0].forEach(ward=>{
        if(ward.hospitalId==hospitalId){
            setGetWardsInSelectedHospital(ward.wards);
        }
    })
    setDisabledSelectHospitalWard(false);
}

React.useEffect(()=>{
    prepareHospitalList();
    getAllRegisteredWardsName(auth.setError,auth.token,setAllWardsNames);
    getAllAvailableRegisteredHospitals(auth.setError,auth.token,setAllRegisteredHospitals,setAllRegisteredHospitalsErrornotification);
    doctorsHospitals(setHospitalsData,auth.setError,auth.token);
    
},[])

React.useEffect(()=>{
    organizeWardDataToDisplayInForm();
},[allRegisteredHospitals])

React.useEffect(()=>{
    doctorsPatients(auth.setNewPatientsList,auth.setErrorLogin,auth.token);
},[addPatientNotification.isOpen])


  return (
    <>
        <Form onSubmit={(e)=>submitForm(e)}>
            <Grid container rowSpacing={2} style={{height:"300px"}}>
                <Grid item xs={12}>
                    <Select name="hospitalId" label="Select Hospital" value = {values.hospitalId}  onChange={(e)=>{handleInputChange(e); getProperWard(e.target.value)}} defaultValue={hospitalOptions[0]} option = {hospitalOptions} error = {errors.hospitalId}/>
                </Grid>
                <Grid item xs={12}>
                    <Select name="wardId" label="Select Ward" value = {values.wardId} onChange={(e)=>{handleInputChange(e)}} defaultValue={getWardsInSelectedHospital[0]} option = {getWardsInSelectedHospital} disabled = {disabledSelectHospitalWard?true:false} error = {errors.wardId} />
                </Grid>
                <Grid item xs={12}>
                    <Button type='submit' text="CONFIRM" />
                </Grid>
            </Grid>
        </Form>
        <Notification notify={addPatientNotification} setNotify={setAddPatientNotification} resetError = {auth.resetError} />
    </>
  )
}

export default AddNewPatient

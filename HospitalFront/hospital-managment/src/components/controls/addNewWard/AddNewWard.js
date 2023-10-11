import React from 'react'
import Select from '../Select'
import {UseForm, Form} from "../../UseForm"
import { Box } from '@mui/system';
import Button from '../Button';
import { Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core'
import Notification from '../../Notification';
import {useAuth} from "../../UseContext"
import {addNewWardToDoctorsHospital, doctorsHospitals} from "../../../apiData/doctor/doctorData";
import {useNavigate, Outlet, Navigate,Link} from "react-router-dom";

const useStyle = makeStyles(theme=>({
    addWardButton:{
        display:'flex',
        justifyContent:"center",
        alignContent:'center',
        height:"45px"
    }
}))

function AddNewWard(props) {
    const {allRegisteredHospitals,setOpenAddWardWindow,setAddWardNotification,yourHospitals} = props;
    const auth = useAuth();
    const classes = useStyle();
    let [hospitalOptions, setHospitalOptions] = React.useState([]);
    let [wardOptions, setWardOptions] = React.useState([]);
    const [renderSelectOptions, setRenderSelectOPtions] = React.useState(false);
    const [selectedHospitalIndex, setSelectedHospitalIndex] = React.useState(0);
    const initialValues = {hospitalName:"", wardName:"", hospitalIndex:null};
    
    

    const { values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleReset} = UseForm(initialValues);

    const organizeHospitalDataToDisplayInForm = ()=>{
        setHospitalOptions([]);
        let index = 0;
        yourHospitals.forEach(hospital => {
            //var hospitalArray = [];
            var hospitalData = {id:null, title:"", hospitalIndex:index};
            hospitalData.id = hospital.hospitalId;
            hospitalData.title = hospital.name;
            //hospitalArray.push(hospitalData);
            setHospitalOptions((prev)=>[...prev,hospitalData])
            index++;
        });
    }

    const organizeWardDataToDisplayInForm = ()=>{
        setWardOptions([]);
        var selectedHospitalId = selectedHospitalIndex;
        var getSelectedHospital = allRegisteredHospitals.find(hospital=>hospital.hospitalId==selectedHospitalId);
        if(getSelectedHospital==undefined){
            getSelectedHospital = allRegisteredHospitals[0];
        }
        var wardArray = []
        getSelectedHospital.wards.forEach(ward=>{
            var wardOptions = {id:ward.wardId, title:ward.wardName};
            wardArray.push(wardOptions);
        })
        setWardOptions(wardArray);

    }

    React.useEffect(()=>{
        organizeHospitalDataToDisplayInForm();
        organizeWardDataToDisplayInForm();
        setRenderSelectOPtions(true);
        //doctorsHospitals(setYourHospitals,auth.setError,auth.token);
        
    },[])

    

    const setNewHospitalIndex = (hospitalId)=>{
        setSelectedHospitalIndex(hospitalId);
        
    }

    React.useEffect(()=>{
        organizeWardDataToDisplayInForm();
    },[selectedHospitalIndex])

    const handleConfirmDataToSent = (e)=>{
        e.preventDefault();
       
       setErrors({});
        if(validateData()){
            addNewWardToDoctorsHospital(auth.setError,auth.token,values.hospitalName,values.wardName,setAddWardNotification)
            //handleReset();
            //auth.resetError();
            setOpenAddWardWindow();
        }
        
    }

    const validateData = ()=>{
        let temporaryErrors = {};
        setErrors({});
        temporaryErrors.hospitalName = values.hospitalName===""?"Select Hospital":"";
        temporaryErrors.wardName = values.wardName===""?"Select Ward":"";
        setErrors({...temporaryErrors});
        return Object.values(temporaryErrors).every(item=>item==="");
    }
    
  return (
    <>
    {/* {auth.error!="" ? (<Navigate to = "/api/error" />) : null} */}
   
    <Box style={{display:'flex', justifyContent:'center', alignContent:'center', Width:'100%', flexDirection:'column'}}>
        <Form onSubmit = {handleConfirmDataToSent}>
            <Grid container rowSpacing={2} style={{height:"100%"}}>
                    <Grid item xs={12}>
                        {renderSelectOptions && <Select name="hospitalName" label="Select Hospital" value = {values.hospitalName} defaultValue = {hospitalOptions[0]} onChange = {(event)=>{handleInputChange(event); setNewHospitalIndex(event.target.value)}} option={hospitalOptions} error={errors.hospitalName}/>}
                    </Grid>
                    <Grid item xs={12}>
                        {renderSelectOptions && <Select name = "wardName" label="Select Ward" disabled ={values.hospitalName ===""?true:false} value = {values.wardName} onChange={handleInputChange} option={wardOptions} error= {errors.wardName}/>}
                    </Grid>
                    <Grid item xs={12}>
                        <Button text = {"Confirm"} type = "submit" className = {classes.addWardButton}/>
                    </Grid>
            </Grid>
       </Form>
    </Box>
    
    </>
  )
}

export default AddNewWard




// const organizeWardDataToDisplayInForm = ()=>{
//     setWardOptions([]);
//     allRegisteredHospitals.forEach(hospital => {
//         var wardArray = [];
//         var wardsInHospital = hospital.wards;
//         wardsInHospital.forEach(ward=>{
//             var wardOptions = {id:ward.wardId, title:ward.wardName};
//             //var wardOptions = {id:ward.wardId, title:auth.allRegisteredApplicationWards[ward.wardNameAsEnumNumber].name};
//             wardArray.push(wardOptions);
//         })
        
//         setWardOptions(prev=>[...prev,wardArray])
//     });

// }
import { Box } from '@mui/system';
import React from 'react'
import AdminSideBar from '../../../components/HeaderComponents/AdminSidebar'
import { useAuth } from '../../../components/UseContext'
import { useFormik } from "formik";
import * as yup from "yup";
import {useTheme, useMediaQuery } from '@material-ui/core';
import {getAllHospitals,GetHospitalById,UpdateHospitalBasicDataFromAdmin} from "../../../apiData/admin/adminData";
import { TextField, Typography } from '@mui/material';
import {AddNewHospital as newHospital} from "../../../apiData/admin/adminData"
import Notification from '../../../components/Notification';
import {Navigate} from "react-router-dom";
import { UseForm,Form } from '../../../components/UseForm';
import Select from '../../../components/controls/Select';
import Input from '../../../components/controls/Input';
import { makeStyles } from '@material-ui/core'
import Button from '../../../components/controls/Button';

const useStyle = makeStyles(theme=>({
    selectField:{
        "&:hover fieldset":{
            border:'1px solid #ff9100'
        },
        '& .MuiFormLabel-root':{
            color:'#dfdfdf !important'
        }
    }
 }))

function UpdateHospital() {
    const auth = useAuth();
    const classes = useStyle();
    //const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const displayUpToLg = useMediaQuery(theme.breakpoints.up('md'));
    const [hospitalStatusInfo,setHospitalStatusInfo] = React.useState({isOpen:false, type:'error', messaage:""});
    const initialValues = {hospitalId:'',country:'',city:'', street:''}
    const [allRegisteredHospitals, setAllRegisteredHospitals] = React.useState([]);
    const [selectedHospitalData,setSelectedHospitalData] = React.useState({})
    const [disableTextField, setDisableTextField] = React.useState(true);
    const [choosenHospital, setChoosenHospital] = React.useState("");
    
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleReset
    } = UseForm(initialValues);

    const submitHospitalData = (e)=>{
        handleReset();
        e.preventDefault();
        if(validateData()){
            UpdateHospitalBasicDataFromAdmin(auth.setError,auth.token,values,setHospitalStatusInfo)
            handleReset();
            setChoosenHospital("");
        }
    }
    
    React.useEffect(()=>{
        getAllHospitals(auth.setErrors,auth.token,setAllRegisteredHospitals);
    },[])

    React.useEffect(()=>{
        handleReset();
        if(choosenHospital!=''){
            GetHospitalById(auth.setError, auth.token,choosenHospital,setSelectedHospitalData);
            setValues(()=>({...values, country:selectedHospitalData.country, city:selectedHospitalData.city, street:selectedHospitalData.street}))
        }
    },[choosenHospital,JSON.stringify(selectedHospitalData)])

    const validateData = ()=>{
        var temporaryErrors = {};
        temporaryErrors.country = (values.country!="") ? "" : "Fill in Country field";
        temporaryErrors.city = (values.city !="") ? "" : "Fill in City field";
        temporaryErrors.street = (values.street !="") ? "" : "Fill in Street field";
        console.log("temporary errors");
        console.log(temporaryErrors);
        setErrors({...temporaryErrors});
        var returnValue = Object.values(temporaryErrors).every(item=>item=="");
        temporaryErrors = {};
        return returnValue;
    }

  return (
    <>
         {auth.error!="" ? (<Navigate to = "/api/error" />) : null}
         <Box display='flex' flexDirection='row'>
            <Box>
                <AdminSideBar userName = {auth.user} />
            </Box>
            <Box display='flex' flexDirection='column' alignItems={displayUpToLg ? 'center':'flex-start'} flexGrow='2' flexBasis={displayUpToLg ? '400px':'0px'}>
                <Typography variant={displayUpToLg ? 'h3' : 'h6'} sx={{position:'absolute', left:displayUpToLg ?'350px':'150px', top:'50px', color:'#4cceac', fontFamily:'Itallic'}}>UPDATE HOSPITAL</Typography>
                <Box marginTop='200px' 
                     minWidth='50vw' 
                     flexBasis='200px' 
                     display='flex' 
                     alignItems='center' 
                     flexDirection='column' 
                     backgroundColor='#dfdfdf' 
                     justifyContent='center' 
                     borderRadius='10px' 
                     borderTop= '1px solid rgba(255, 255, 255, 0.5)'
                     borderLeft= '1px solid rgba(255, 255, 255, 0.5)' 
                >
                    <form onSubmit = {submitHospitalData}>
                        <Box sx={displayUpToLg ? {minWidth:'500px', width:'700px',gap:'30px' ,display:'flex',padding:'20px', alignItems:'center', flexDirection:'column'} : {minWidth:'200px',padding:'20px', width:'300px',display:'flex',gap:'30px', alignItems:'center',flexDirection:'column'}}>
                            <Select 
                                name = "hospitalId"
                                label = "Select Hospital"
                                value = {values.hospitalId}
                                error = {errors.hospitalId}
                                option ={allRegisteredHospitals}
                                className = {classes.selectField}
                                defaultValue = {allRegisteredHospitals[0]}
                                onChange = {(e)=>{handleInputChange(e); setChoosenHospital(e.target.value); setDisableTextField(false)}}
                            />
                            <Input 
                                fullWidth
                                name = "country"
                                label = "Country"
                                value = {values.country}
                                error = {errors.country}
                                onChange = {handleInputChange}
                                disabled = {disableTextField ? true : false}
                            />
                            <Input 
                                fullWidth
                                name = "city"
                                label = "City"
                                value = {values.city}
                                error = {errors.city}
                                onChange = {handleInputChange}
                                disabled = {disableTextField ? true : false}
                            />
                            <Input 
                                fullWidth
                                name = "street"
                                label = "Street"
                                value = {values.street}
                                error = {errors.street}
                                onChange = {handleInputChange}
                                disabled = {disableTextField ? true : false}
                            />
                            <Button type='submit' text = 'CONFIRM' />
                        </Box>

                    </form>
                </Box>
            </Box>
        </Box>
        <Notification notify = {hospitalStatusInfo} setNotify = {setHospitalStatusInfo} resetError = {auth.resetError} />
    </>
    
  )
}

export default UpdateHospital
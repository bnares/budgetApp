import { FormControl, Typography } from '@mui/material';
import { isInteger, useFormik } from "formik";
import * as yup from "yup";
import { Box } from '@mui/system';
import React from 'react'
import {Navigate} from "react-router-dom";
import AdminSideBar from '../../../components/HeaderComponents/AdminSidebar';
import { useAuth } from '../../../components/UseContext';
import {getAllHospitals,getWardsNotAsignedToSelectedHospital,addWardToHospital} from "../../../apiData/admin/adminData";
import Button from '../../../components/controls/Button';
import { UseForm } from '../../../components/UseForm';
import Select from '../../../components/controls/Select';
import {makeStyles } from '@material-ui/core'
import {useTheme, useMediaQuery } from '@material-ui/core';
import Input from '../../../components/controls/Input';
import Notification from '../../../components/Notification';


const useStyle = makeStyles(theme=>({
    selectMenuuuu:{
       
        width:"400px",
    },
    label:{
        textTransform:'none'
    }
}))

function AddWardToHospital() {
    const auth = useAuth();
    const classes = useStyle();
    const theme = useTheme();
    const displayUpToLg = useMediaQuery(theme.breakpoints.up('md'));
    const initialVluesForm = {hospitalId:"", wardName:"", maxCapacity:0,occupiedBeds:0}

    const { values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleReset
    } = UseForm(initialVluesForm);

    const [allRegisteredHospitals, setAllRegisteredHospitals] = React.useState([]);
    const [choosenHospital, setChoosenHospital] = React.useState("");
    const [notYetAsignedWards,setNotYetAsignedWards] = React.useState([]);
    const [disabledWardOptions, setDisabledWardOptions] = React.useState(true);
    const [addWardStatus, setAddWardStatus] = React.useState({isOpen:false, message:"", type:"error"});
    

    React.useEffect(()=>{
        getAllHospitals(auth.setError,auth.token,setAllRegisteredHospitals);
    },[])

    React.useEffect(()=>{
        validateData();
    },[errors.hospitalId,errors.wardName, errors.occupiedBeds,errors.maxCapacity,values.hospitalId, values.wardName,values.occupiedBeds,values.maxCapacity,])


    React.useEffect(()=>{
        if(values.hospitalId!=""){
            getWardsForHospital();
            setDisabledWardOptions(false);
        }
    },[choosenHospital])

    
    const getWardsForHospital = ()=>{
        getWardsNotAsignedToSelectedHospital(setNotYetAsignedWards,auth.setError,auth.token,values.hospitalId);
    }

    const handleChangeOfHospital = ()=>{
        handleInputChange()
    }

    const submitValues = (e)=>{
        e.preventDefault();
        if(validateData()){
            console.log(values);
            addWardToHospital(auth.setError, auth.token,values,setAddWardStatus);
            handleReset();
            setChoosenHospital("");
        }
    }

   

    const validateData=()=>{
        setErrors({});
        if(values.maxCapacity=="") values.maxCapacity="0";
        if(values.occupiedBeds=="") values.occupiedBeds="0";
        let temporaryErorrs = {};
        temporaryErorrs.hospitalId = values.hospitalId==="" ? "Fill in hospital field" : "";
        temporaryErorrs.wardName = values.wardName ==="" ? "Fill in Ward field" : "";
        temporaryErorrs.occupiedBeds = !!parseInt(values.occupiedBeds) ? "":"Type Number";
        temporaryErorrs.maxCapacity = !!parseInt(values.maxCapacity) ? "" :"Type Number";
        temporaryErorrs.occupiedBeds = !!String(values.occupiedBeds).includes('.') ? "Type Integer Number":"";
        temporaryErorrs.maxCapacity = !!String(values.maxCapacity).includes('.') ? "Type Integer Number":"";
        temporaryErorrs.occupiedBeds = parseInt(values.occupiedBeds)> parseInt(values.maxCapacity) ? "Number of Occupied beds too big":'';
        temporaryErorrs.maxCapacity = parseInt(values.occupiedBeds)> parseInt(values.maxCapacity) ? "Number of max capacity too low":'';
        setErrors({...temporaryErorrs});
        return Object.values(errors).every(item=>item=="");
        
    }

  return (
    <>
        {auth.error!="" ? (<Navigate to = "/api/error" />) : null}
        <Box display='flex' flexDirection='row'>
            <Box>
                <AdminSideBar userName = {auth.user} />
            </Box>
            
            <Box display='flex' flexDirection='column' alignItems='center' flexGrow='2' flexBasis='400px' paddingTop="30px" >
                <Typography variant={displayUpToLg ? 'h3' : 'h4'} sx={{position:'absolute', left:displayUpToLg ?'350px':'150px', top:'50px', color:'#4cceac', fontFamily:'Itallic'}}>ADD WARD</Typography>
                <Box 
                     marginTop='200px' 
                     //minWidth='50vw' 
                     flexBasis='200px' 
                     display='flex' 
                     alignItems='center' 
                     flexDirection='column' 
                     boxShadow= 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                     backgroundColor="#dfdfdf" 
                     justifyContent='center' 
                     borderRadius='10px' 
                     borderTop= '1px solid rgba(255, 255, 255, 0.5)'
                     borderLeft= '1px solid rgba(255, 255, 255, 0.5)' 
                     gap="20px"
                     padding='30px'
                     sx={displayUpToLg ?{minWidth:'50vw'} : {width:'300px'}}
                >
                    
                    <Select 
                         classes = {classes.selectMenuuuu}
                         name="hospitalId"
                         label="Select Hospital"
                         value = {values.hospitalId}
                         error = {errors.hospitalId}
                         onChange = {(event)=>{handleInputChange(event); setChoosenHospital(event.target.value)}}
                         option = {allRegisteredHospitals}
                         defaultValue = {allRegisteredHospitals[0]}
                         
                    />

                    <Select 
                        name = "wardName"
                        label ="Select Ward"
                        value = {values.wardName}
                        error = {errors.wardName}
                        onChange = {handleInputChange}
                        option = {notYetAsignedWards}
                        disabled = {disabledWardOptions ? true : false}
                    />

                    <FormControl  fullWidth>
                        <Input 
                            label = "Max Capacity"
                            //defaultValue = "0"
                            name = "maxCapacity"
                            onChange = {(e)=>handleInputChange(e)}
                            value = {values.maxCapacity}
                            type = 'number'
                            step = '1'
                            error = {errors.maxCapacity}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <Input 
                            label = "Occupied Beds"
                            //defaultValue = "0"
                            name = "occupiedBeds"
                            onChange = {(e)=>handleInputChange(e)}
                            value = {values.occupiedBeds}
                            type = 'number'
                            step = '1'
                            error = {errors.occupiedBeds}
                        />
                    </FormControl>

                    <Box sx={displayUpToLg ? {width:500, minWidth:300} : {width:200, minWidth:120} }  margin="20px 0">
                        <Button text="Confirm" onClick = {submitValues}/>
                    </Box>
                    
                </Box>
            </Box>
        </Box>
        <Notification notify = {addWardStatus} setNotify = {setAddWardStatus} resetError = {auth.resetError} />
    </>
    
  )
}

export default AddWardToHospital
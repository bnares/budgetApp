import React from 'react'
import { FormControl, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {Navigate} from "react-router-dom";
import AdminSideBar from '../../../components/HeaderComponents/AdminSidebar';
import { useAuth } from '../../../components/UseContext';
import {getAllHospitals,getAllHospitalsWard,updateWard} from "../../../apiData/admin/adminData";
import Button from '../../../components/controls/Button';
import { UseForm,Form } from '../../../components/UseForm';
import Select from '../../../components/controls/Select';
import {useTheme, useMediaQuery } from '@material-ui/core';
import Input from '../../../components/controls/Input';
import Notification from '../../../components/Notification';
import { InsertPageBreakSharp } from '@mui/icons-material';

function UpdateWard() {
    const auth = useAuth();
    const theme = useTheme();
    const displayUpToLg = useMediaQuery(theme.breakpoints.up('md'));
    const initialVluesForm = {hospitalId:"", wardId:"", maxCapacity:0,occupiedBeds:0}

    const { values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleReset
    } = UseForm(initialVluesForm);

    const [allRegisteredHospitals, setAllRegisteredHospitals] = React.useState([]);
    const [choosenHospital, setChoosenHospital] = React.useState("");
    const [choosenWard, setChoosenWard] = React.useState("");
    const [hospitalsWard,setHospitalsWard] = React.useState([]);
    const [disabledWardOptions, setDisabledWardOptions] = React.useState(true);
    const [disabledTexFieldOptions, setDisabledTexFieldOptions] = React.useState(true);
    const [maxCapacity, setMaxCapacity] = React.useState(0);
    const [maxCapacityError, setMaxCapacityError] = React.useState("");
    const [occupiedBed, setOccupiedBed] = React.useState(0);
    const [occupiedBedError, setOccupiedBedError] = React.useState("");
    const [hospitalId, setHospitalId] = React.useState('');
    const [hospitalIdError, setHospitalIdError] = React.useState("");
    const [wardId, setWardId] = React.useState('');
    const [wardIdError, setWardIdError] = React.useState("");
    const [updateWardStatus,setUpdateWardStatus] = React.useState({isOpen:false, message:"", type:"error"});
    const [validationStart,setValidationStart] = React.useState(false);
    // const [preeMatureValidationInfo, setPreeMatureValidationInfo] = React.useState({isOpen:false, message:'Fill in Form',type:'info'});

    React.useEffect(()=>{
        getAllHospitals(auth.setError,auth.token,setAllRegisteredHospitals);
    },[])

    React.useEffect(()=>{
        validateData();
    },[hospitalIdError, wardIdError,maxCapacityError,occupiedBedError,hospitalId,wardId,maxCapacity,occupiedBed])

    React.useEffect(()=>{
        setWardId("");
        setMaxCapacity(0);
        setOccupiedBed(0);
        setDisabledTexFieldOptions(true);
        setDisabledWardOptions(true);
        if(hospitalId!=""){
            getWardsForHospital();
            setDisabledWardOptions(false);
        }
    },[choosenHospital])

    React.useEffect(()=>{
        if(wardId!=""){
            var getSelectedHospitalWard = hospitalsWard.find(x=>x.id==choosenWard);
            setOccupiedBed(getSelectedHospitalWard.occupiedBeds);
            setMaxCapacity(getSelectedHospitalWard.maxCapacity); 
            setDisabledTexFieldOptions(false);
        }
        
    },[choosenWard])

    const getWardsForHospital = ()=>{
        getAllHospitalsWard(auth.setError,auth.token,hospitalId,setHospitalsWard);
        
    }

    const submitValues = (e)=>{
        e.preventDefault();
        
        setHospitalIdError((prev)=>"");
        setWardIdError((prev)=>"");
        setMaxCapacityError((prev)=>"");
        setOccupiedBedError((prev)=>"");
            //alert("Ruszamy");
            //alert(validateData());
            //debugger;
            if(validateData()){
                
                var dataToFeed = {
                    wardId: parseInt(wardId),
                    maxCapacity: parseInt(maxCapacity),
                    occupiedBeds: parseInt(occupiedBed)
                }
                updateWard(auth.setError,auth.token,dataToFeed,setUpdateWardStatus);

                setHospitalIdError("");
                setWardIdError("");
                setMaxCapacityError("");
                setOccupiedBedError("");
                setHospitalId('');
                setWardId('');
                setMaxCapacity(0);
                setOccupiedBed(0);
                setDisabledWardOptions(true);
                setDisabledTexFieldOptions(true);
                setChoosenHospital("");
                setChoosenWard("");
            }
    }

    const validateData=()=>{
        
        setHospitalIdError((prev)=>"");
        setWardIdError((prev)=>"");
        setMaxCapacityError((prev)=>"");
        setOccupiedBedError((prev)=>"");
        //if(hospitalId=="" && wardId=="" && maxCapacity==0 && occupiedBed==0) return false;
        debugger;
        if(hospitalId=="" || hospitalId==null || hospitalId == undefined){
             setHospitalIdError(prev=>prev+"Fill in Hospital");
        } else if(wardId == "" || wardId==null || wardId ==undefined){
            setWardIdError(prev=>prev+"Fill in ward field");
        }
        else if(maxCapacity=="" || maxCapacity==null || maxCapacity==undefined){
            setMaxCapacityError(prev=>prev+"Max Capacity is not a number");
        }
        else if(occupiedBed=="" || occupiedBed ==null || occupiedBed==undefined){
            setOccupiedBedError(prev=>prev+"Occupied Bed is not a number");
        }else if(!!String(occupiedBed).includes('.')){
            setOccupiedBedError(prev=>prev+"Type Integer Number");
        }else if(!!String(maxCapacity).includes('.')){
            setMaxCapacityError(prev=>prev+"Type integer number")
        }
        else if(parseInt(maxCapacity) < parseInt(occupiedBed)){
            setMaxCapacityError(prev=>prev+"Max Capacity is too low");
            setOccupiedBedError(prev=>prev+"Occupied Bed too big");
        }
        
        if(maxCapacityError==="" && maxCapacityError==="" && hospitalIdError==="" && wardIdError==="") return true;
        return false;
    }

  return (
    <>
        {auth.error!="" ? (<Navigate to = "/api/error" />) : null}
        <Box display='flex' flexDirection='row'>
            <Box>
                <AdminSideBar userName = {auth.user} />
            </Box>
            
            <Box display='flex' flexDirection='column' alignItems='center' marginRight='30px' flexGrow='2' flexBasis='400px' paddingTop="30px" >
                <Typography variant={displayUpToLg ? 'h3' : 'h4'} sx={{position:'absolute', left:displayUpToLg ?'350px':'150px', top:'50px', color:'#4cceac', fontFamily:'Itallic'}}>UPDATE WARD</Typography>
                <Box minWidth='300px' width='600px'>
                <Form onSubmit = {submitValues}>
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
                         name="hospitalId"
                         label="Select Hospital"
                         value = {hospitalId}
                         error = {hospitalIdError}
                         onChange = {(event)=>{setHospitalId(event.target.value); setChoosenHospital(event.target.value)}}
                         option = {allRegisteredHospitals}
                         //defaultValue = {allRegisteredHospitals[0]}
                        sx={{paddingTop:'20px'}}
                    />

                    <Select 
                        name = "wardId"
                        label ="Select Ward"
                        value = {wardId}
                        error = {wardIdError}
                        onChange = {(e)=>{setWardId(e.target.value); setChoosenWard(e.target.value)}}
                        option = {hospitalsWard}
                        disabled = {disabledWardOptions ? true : false}
                        sx={{paddingTop:'20px'}}
                    />

                    <FormControl  fullWidth>
                        <Input 
                            label = "Max Capacity"
                            //defaultValue = "0"
                            name = "maxCapacity"
                            onChange = {(e)=>setMaxCapacity(e.target.value)}
                            value = {maxCapacity}
                            type = 'number'
                            step = '1'
                            error = {maxCapacityError}
                            disabled = {disabledTexFieldOptions ? true : false}
                            sx={{paddingTop:'20px'}}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <Input 
                            label = "Occupied Beds"
                            //defaultValue = "0"
                            name = "occupiedBeds"
                            onChange = {(e)=>setOccupiedBed(e.target.value)}
                            value = {occupiedBed}
                            type = 'number'
                            step = '1'
                            error = {occupiedBedError}
                            disabled = {disabledTexFieldOptions ? true : false}
                            sx={{paddingTop:'20px'}}
                        />
                    </FormControl>

                    <Box sx={displayUpToLg ? {width:500, minWidth:300} : {width:200, minWidth:120} }  margin="20px 0">
                        <Button text="Confirm" type='submit'/>
                    </Box>
                </Box>
                </Form>
                </Box>
            </Box>
        </Box>
        <Notification notify = {updateWardStatus} setNotify = {setUpdateWardStatus} resetError = {auth.resetError} />
        
    </>
  )
}

export default UpdateWard
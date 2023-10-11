import React from 'react'
import "./login.scss";
//import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core'
import {ENDPOINTS, createApiEndpoint} from "../../appi/Api.js";
import Button from "../../components/controls/Button";
import Input from '../../components/controls/Input.js';
import { Grid } from '@mui/material';
import RadioGroup from '../../components/controls/RadioGroup';
import  {UseForm,Form}  from "../../components/UseForm"
import LoginIcon from '@mui/icons-material/Login';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link, Navigate, useNavigate} from "react-router-dom"
import AccessibleIcon from '@mui/icons-material/Accessible';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Notification from '../../components/Notification';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MainWIndow from '../doctor/home/MainWIndow';
import {useAuth} from "../../components/UseContext.js";
import { ConstructionOutlined } from '@mui/icons-material';


const useStyle = makeStyles(theme=>({
    root:{
        "& .MuiInputBase-root":{
            width:"100%",
            color:"white",
            borderColor:"white",
         },

        "& .MuiInputLabel-root":{
            color:"white",
        },


        "& .MuiFormLabel-root":{
            color:"white",
        }
    }
}))

export default function Login() {
    const classes = useStyle();
    const navigate = useNavigate();
    const introData = {name:"", surname:"", password:"", role:"0"}
    const roles = [{id:"0", title:"Doctor"}, {id:"1", title:"Patient"},{id:"2", title:"Admin"}]
    const {values, setValues, errors, setErrors,handleInputChange,handleReset} = UseForm(introData);
    const [notify, setNotify] = React.useState({isOpen:false, message:"", type:"error"});
    const {login,logout,setNewToken,resetToken, user, token,errorLogin, setErrorLogin,error,setError,resetError} = useAuth();
    
    const submit = ()=>{
            
            let copyOfFormValues = {...values, role:parseInt(values.role)}
            
            createApiEndpoint(ENDPOINTS.login).create(copyOfFormValues)
                                                .then(response=>{
                                                    
                                                    handleReset();
                                                    setValues(introData);
                                                    login({...response.data.data.user});
                                                    setNewToken(response.data.data.token);
                                                    redirectUserToMainPage(response.data.data.user.role, response.data.data.user.id);
                                                    //navigate("/api/mainWindow", {replace:true});
                                                })
                                                .catch(er=>{
                                                     if(er.response.data==="User not found !!."){
                                                        setError(er.response.data)
                                                    }else if(er.response.data==='Wrong password.'){
                                                        setError(er.response.data);
                                                    }
                                                    else{
                                                        setErrorLogin("request error during loading the page "+er.message)
                                                    }
                                                   
                                                    //<Navigate to = "/api/error" />
                                                    
                                                })
        }

        const redirectUserToMainPage = (RoleNumber, UserId)=>{
            
            switch(RoleNumber){
                case(0): 
                    navigate("/api/mainWindow", {replace:true});
                    break;
                case(1): 
                    navigate(`/api/patient/${UserId}`, {replace:true});
                    break;
                case(2): 
                    navigate(`/api/Admin`, {replace:true});
                    break;
                default: 
                    navigate('/api/unauthorized', {replace:true})
            }
        }

        const handleSubmit = (e)=>{
            e.preventDefault();
            submit();
        }

    React.useEffect(()=>{
       
        if(error==="User not found !!."|| error==="Wrong password."){
            setNotify({isOpen:true, message:error, type:"error"})
            
        }
    }, [error])


  return (
   <>
    <div className="container">
        <div className="form">
        <Form onSubmit = {handleSubmit}>
                <Grid container rowSpacing={0}>
                    <Grid item xs={12}>
                        <Input label = "Name" name="name" value = {values.name} className = {classes.root} onChange= {(e)=>handleInputChange(e)} error = {errors.name}  InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <AccountCircleRoundedIcon fontSize='large' color='info' />
                                </InputAdornment>
                            ),}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input label = "Surname" name="surname" value = {values.surname} className={classes.root} onChange= {(e)=>handleInputChange(e)} error = {errors.surname} InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <AccountCircleRoundedIcon fontSize='large' color='info' />
                                </InputAdornment>
                            ),}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input type = "password" label = "Password" name="password" value = {values.password} className={classes.root} onChange= {(e)=>handleInputChange(e)} error = {errors.password} InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon fontSize='large' color='info' />
                                </InputAdornment>
                            ),}}/>
                    </Grid>
                    
                    <Grid item xs={12} className={classes.root}>
                        <RadioGroup row label="Role" name ="role" value = {values.role} onChange = {(e)=>handleInputChange(e)} items = {roles} iconsList = {[<LocalHospitalIcon key={0}/>, <AccessibleIcon key={1}/>, <AdminPanelSettingsIcon key={2}/>]} />
                    </Grid>
                    <Grid item xs={12} className="btn">
                        <Button text="LOGIN" type='submit' endIcon = {<LoginIcon />}/>
                    </Grid>
                   
                </Grid>
            </Form>
        </div>
        <div className="bubbles">
           <span style={{"--i":29}}></span>
           <span style={{"--i":22}}></span>
           <span style={{"--i":18}}></span>
           <span style={{"--i":27}}></span>
           <span style={{"--i":34}}></span>
           <span style={{"--i":17}}></span>
           <span style={{"--i":14}}></span>
           <span style={{"--i":19}}></span>
           <span style={{"--i":27}}></span>
           <span style={{"--i":23}}></span>
           <span style={{"--i":29}}></span>
           <span style={{"--i":18}}></span>
           <span style={{"--i":22}}></span>
           <span style={{"--i":19}}></span>
           <span style={{"--i":27}}></span>
           <span style={{"--i":23}}></span>
           <span style={{"--i":16}}></span>
           <span style={{"--i":19}}></span>
           <span style={{"--i":27}}></span>
           <span style={{"--i":15}}></span>
           <span style={{"--i":23}}></span>
           <span style={{"--i":26}}></span>
           <span style={{"--i":19}}></span>
           <span style={{"--i":28}}></span>
           <span style={{"--i":15}}></span>
           <span style={{"--i":34}}></span>
           <span style={{"--i":27}}></span>
           <span style={{"--i":16}}></span>
           <span style={{"--i":19}}></span>
           <span style={{"--i":24}}></span>
           <span style={{"--i":27}}></span>
           <span style={{"--i":29}}></span>
           <span style={{"--i":25}}></span>
           <span style={{"--i":33}}></span>
           <span style={{"--i":29}}></span>
           <span style={{"--i":37}}></span>
           <span style={{"--i":19}}></span>
           
        </div>
    </div>
    <Notification notify = {notify} setNotify = {setNotify} resetError = {resetError}/>
   </>
    
  )
}

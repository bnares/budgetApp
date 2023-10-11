import { Grid } from '@mui/material';
import React from 'react'
import "./register.scss";
import Input from "../../components/controls/Input"
import  {UseForm,Form}  from "../../components/UseForm"
import { resolveBreakpointValues } from '@mui/system/breakpoints';
import Notification from "../..//components/Notification"
import RadioGroup from '../../components/controls/RadioGroup';
import Button from '../../components/controls/Button';
import {ENDPOINTS, createApiEndpoint} from "../../appi/Api.js";
import {Link} from "react-router-dom"
import { useAuth } from "../../components/UseContext"

function Register() {
    const auth = useAuth();
    const handleSubmit = (e)=>{
        e.preventDefault();
        
        if(validation()){
            submit();
            setErrors({});
        }

    }
    const introData = {name:"", surname:"", password:"", role:"0"}
    const roles = [{id:"0", title:"Doctor"}, {id:"1", title:"Patient"}]
    const {values, setValues, errors, setErrors,handleInputChange,handleReset} = UseForm(introData);
    const [notify,setNotify] = React.useState({isOpen:false, message:"", type:"error"});

    const validation = ()=>{
        let tempErrors = {};
        tempErrors.name = values.name!=""?"":"Fill in Name field";
        tempErrors.surname = values.surname!=""?"":"Fill in Surname field";
        tempErrors.password = values.password.length >5 ?"":"Password must be at least 6 char long";
        setErrors({...tempErrors});
        return Object.values(tempErrors).every(item=>item=="");
    }

    const submit = (e)=>{
                                                
        let copyOfFormValues = {...values, role:parseInt(values.role)};

        createApiEndpoint(ENDPOINTS.register).create(copyOfFormValues)
                                            .then(response=>{
                                                
                                                setValues({name:"", surname:"", password:"", role:"0"})
                                                setNotify(()=>{return{isOpen:true,message: "User '"+response.data.data.surname+"' created, Click Log in below.", type:"success"}})
                                            })
                                            .catch(function(response){
                                                setNotify(()=>{return{isOpen:true, message:response.message, type:"error"}})
                                            })
    }

  return (
    <>
    <Grid container className='main' justifyContent="center" alignItems="center">
        <Grid item xs={3} className="ballBig"></Grid>
        <Grid item xs={6} className="registerForm">
            <Form onSubmit = {handleSubmit}>
                <Grid container rowSpacing={0}>
                    <Grid item xs={12}>
                        <Input label = "Name" name="name" value = {values.name} onChange= {(e)=>handleInputChange(e)} error = {errors.name}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Input label = "Surname" name="surname" value = {values.surname} onChange= {(e)=>handleInputChange(e)} error = {errors.surname} />
                    </Grid>
                    <Grid item xs={12}>
                        <Input type = "password" label = "Password" name="password" value = {values.password} onChange= {(e)=>handleInputChange(e)} error = {errors.password}/>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <RadioGroup label="Role" name ="role" value = {values.role} onChange = {(e)=>handleInputChange(e)} items = {roles} />
                    </Grid>
                    <Grid item xs={12} className="btn">
                        <Button text="REGISTER" type='submit'/>
                    </Grid>
                    <Grid container justifyContent="flex-end" rowSpacing={4}>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={3}  >
                            <Link to = "/api/Auth/login" style={{textDecoration:"none", color:"white", backgroundColor:"red", padding:"10px", borderRadius:"5px"}}>
                                <span>Log in</span>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Form>
        </Grid>
        <Grid item xs={3} className="ballSmall"></Grid>
        
       
    </Grid>
    <Notification 
        notify={notify}
        setNotify = {setNotify}
    />
    </>
  )

}

export default Register
import React from 'react'
import Input from "../../components/controls/Input.js";
import { UseForm,Form } from '../../components/UseForm.js';
import { Grid } from '@mui/material';
import Button from '../../components/controls/Button.js';
import { makeStyles } from '@material-ui/core'
import SendIcon from '@mui/icons-material/Send';
import {newUserCredentials} from "../../apiData/doctor/doctorData";
import {useAuth} from "../../components/UseContext";
const useStyle = makeStyles(theme=>({
    modifyProfileButton:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        '.MuiGrid-root':{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        }
    }
}))

function ModifyProfile(props) {
    const {setOpenNotificationUserCredentials, setOpenModifyAccountWindow} = props
    const auth = useAuth();
    const {values, setValues,errors,setErrors,handleInputChange,handleReset} = UseForm({name:"", surname:""})
    const classes = useStyle();

    const validateForm = ()=>{
       let temporatyErrors = {};
       temporatyErrors.name = values.name.length>0?"":"Fill in name field";
       temporatyErrors.surname = values.surname.length>0?"":"Fill in surname field";
       setErrors({...temporatyErrors})
       return Object.values(temporatyErrors).every(item=>item=="");

    }

    const submit = (event)=>{
        event.preventDefault();
        if(validateForm()){
           
            const name = values.name;
            const surname = values.surname;
            handleReset();
            setErrors({});
            auth.resetError();
            newUserCredentials({'name':name, 'surname':surname},auth.setNewErrorMessage,auth.token,setOpenNotificationUserCredentials,setOpenModifyAccountWindow)
            auth.user.name = name;
            auth.user.surname = surname;
        }
    }

  return (
    <>
        <Form onSubmit = {submit}>
            <Grid container rowSpacing={2} className = {classes.modifyProfileButton} style={{height:"300px"}}>
                <Grid item xs={12}>
                    <Input label="Name" name = 'name' value = {values.name} onChange = {handleInputChange} error = {errors.name}/>
                </Grid>
                <Grid item xs={12}>
                    <Input label="Surname" name = "surname" value = {values.surname} onChange = {handleInputChange} error = {errors.surname}/>
                </Grid>
                <Grid item xs = {6} >
                    <Button text = "CONFIRM" endIcon={<SendIcon /> } type='submit'/>
                </Grid>
            </Grid>
        </Form>
    </>
    
  )
}

export default ModifyProfile
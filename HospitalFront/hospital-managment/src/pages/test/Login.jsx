import React from 'react'
import "./login.scss";
//import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from '@material-ui/core'
import {ENDPOINTS, createApiEndpoint} from "../../appi/Api.js";
import Button from "../../components/controls/Button";
import Input from '../../components/controls/Input.js';
import TextField from '@mui/material/TextField';


const useStyle = makeStyles(theme=>({
    root:{
     '& .MuiSelect-select':{
        
         width:'100%',
         color:"#45f3ff",
         fontFamily:"Ms Madi",
        border: "1px solid #45f3ff",
        color: "#45f3ff",
         
     },
     "& .MuiInputBase-root":{
        width:"100%"
     },
     "& .MuiTextField-root":{
        width:"100%",
        color:"white",
        borderColor:"#45f3ff",
     },
     '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#45f3ff',
          width:"100%",
        },
        '&:hover fieldset': {
          borderColor: '#45f3ff',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#45f3ff',
        },
      },
    }
 }))

export default function Login() {
        const classes = useStyle();
        const [formValues, setFormValues] =React.useState({name:"", surname:"", password:"", role:0});
        const submit = (e)=>{
            e.preventDefault();
            createApiEndpoint(ENDPOINTS.register).create(formValues)
                                                .then(response=>{
                                                    console.log(formValues);
                                                    setFormValues({name:"", surname:"", password:"", role:0})
                                                    
                                                })
                                                .catch(er=>{
                                                    console.log("error");
                                                    console.log(er);
                                                })
        }

        const handleInputChange = (e)=>{
            const {name,value} = e.target;
            setFormValues({...formValues, [name]:value}); 
        }
        console.log("formValues");
        console.log(formValues)

  return (
    <form onSubmit={submit}>
        <div className='box'>
            <div className="form">
                <h2>Sign in</h2>
                <div className="inputBox">
                <input type="text" className="text" name='surname' onChange={(e)=>handleInputChange(e)} value={formValues.name}  required="required" />
                    <span>Name</span>
                    <i></i>
                </div>
                <div className="inputBox">
                    <input type="text" className="text" name='surname' onChange={(e)=>handleInputChange(e)} value={formValues.surname}  required="required" />
                    <span>Surname</span>
                    <i></i>
                </div>
                <div className="inputBox">
                    <input type="password" className="text" name='password' onChange={(e)=>handleInputChange(e)} value={formValues.password}  required="required" />
                    <span>Password</span>
                    <i></i>
                </div>
                <div className="selectOption">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formValues.role}
                            
                            onChange={handleInputChange}
                            name="role"
                            className={classes.root}
                            >
                            <MenuItem value={1} className="menuItem">Patient</MenuItem>
                            <MenuItem value={0} className="menuItem">Doctor</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className="buttonConfirm">
                    <Button variant="outlined" onClick={submit} className="btn" text="SUBMIT!!"/>
                </div>
                
            </div>
        </div>
    </form>
  )
}

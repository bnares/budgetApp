import { Box } from '@mui/system';
import React from 'react'
import AdminSideBar from '../../../components/HeaderComponents/AdminSidebar'
import { useAuth } from '../../../components/UseContext'
import { useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button, TextField, Typography } from '@mui/material';
import {AddNewHospital as newHospital} from "../../../apiData/admin/adminData"
import Notification from '../../../components/Notification';
import {Navigate} from "react-router-dom";


function AddNewHospital() {
    const auth = useAuth();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [hospitalStatusInfo,setHospitalStatusInfo] = React.useState({isOpen:false, type:'error', messaage:""});
    const formik = useFormik({
        initialValues : {
            name:'',
            city:'',
            street:'',
            country:''
        },

        onSubmit: (values)=> {
            newHospital(auth.setError,auth.token,values,setHospitalStatusInfo);
            console.log(values);
        },

        validationSchema: yup.object({
            name: yup.string().required('Hospital Required'),
            city: yup.string().required('City Required'),
            street: yup.string().required('Street Required'),
            country: yup.string().required('Country Required'),
        })
       
    })

  return (
    <>
        {auth.error!="" ? (<Navigate to = "/api/error" />) : null}
        <Box display='flex' flexDirection='row'>
            <Box>
                <AdminSideBar userName = {auth.user} />
            </Box>
            <Box display='flex' flexDirection='column' alignItems='center' flexGrow='2' flexBasis='400px'>
                <Typography variant='h3' sx={{position:'absolute', left:'350px', top:'50px', color:'#4cceac'}}>ADD HOSPITAL</Typography>
                <Box marginTop='200px' 
                     minWidth='50vw' 
                     flexBasis='200px' 
                     display='flex' 
                     alignItems='center' 
                     flexDirection='column' 
                     backgroundColor='rgb(31, 34, 35)' 
                     justifyContent='center' 
                     borderRadius='10px' 
                     borderTop= '1px solid rgba(255, 255, 255, 0.5)'
                     borderLeft= '1px solid rgba(255, 255, 255, 0.5)' 
                >
                     
                     <form onSubmit={formik.handleSubmit}>
                        <Box display='grid' flexDirection='column' justifyContent='center' alignItems='center'>
                        <TextField 
                                            fullWidth
                                            
                                            type="text"
                                            color="warning"
                                            variant='outlined'
                                            label = "Hospital Name"
                                            onBlur={formik.handleBlur}
                                            onChange = {formik.handleChange}
                                            value = {formik.values.name}
                                            name = "name"
                                            error = {!!formik.touched.name && !!formik.errors.name} //!! - forced a value to be bool
                                            helperText = {!!formik.touched.name && formik.errors.name}
                                            
                                            sx={{
                                                "&:hover fieldset":{
                                                    border:'1px solid #ff9100'
                                                },
                                                "&:hover fieldset":{
                                                    borderColor:'red'
                                                },
                                                
                                                "& .MuiOutlinedInput-root": {
                                                    '& fieldset': {
                                                      borderColor: '#dfdfdf',
                                                      
                                                    },
                                                    '& legend':{
                                                        color:'#dfdfdf'
                                                      }
                                                },
                                                "& .MuiFormLabel-root":{
                                                    color:'#dfdfdf'
                                                },

                                                "& .MuiInputBase-input":{
                                                    color:'#dfdfdf'
                                                },
                                                width:"600px",
                                                minWidth:'350px', 
                                                marginTop:'30px',
                                                    color:'#dfdfdf'
                                            }}
                                        />

                                        <TextField 
                                            fullWidth
                                            type="text"
                                            color="warning"
                                            variant='outlined'
                                            label = "City"
                                            onBlur={formik.handleBlur}
                                            onChange = {formik.handleChange}
                                            value = {formik.values.city}
                                            name = 'city'
                                            error = {!!formik.touched.city && !!formik.errors.city} //!! - forced a value to be bool
                                            helperText = {!!formik.touched.city && formik.errors.city}
                                            sx={{
                                                
                                                "& .MuiOutlinedInput-root": {
                                                    '& fieldset': {
                                                      borderColor: '#dfdfdf',
                                                      
                                                    },
                                                    '& legend':{
                                                        color:'#dfdfdf'
                                                      }
                                                },
                                                "& .MuiFormLabel-root":{
                                                    color:'#dfdfdf'
                                                },

                                                "& .MuiInputBase-input":{
                                                    color:'#dfdfdf'
                                                },
                                                minWidth:'350px', 
                                                    marginTop:'30px',
                                                    color:'#dfdfdf'
                                                   
                                            }}
                                        />

                                        <TextField 
                                            fullWidth
                                            type="text"
                                            color="warning"
                                            variant='outlined'
                                            label = "Street"
                                            onBlur={formik.handleBlur}
                                            onChange = {formik.handleChange}
                                            value = {formik.values.street}
                                            name = 'street'
                                            error = {!!formik.touched.street && !!formik.errors.street} //!! - forced a value to be bool
                                            helperText = {!!formik.touched.street && formik.errors.street}
                                            sx={{
                                                
                                                "& .MuiOutlinedInput-root": {
                                                    '& fieldset': {
                                                      borderColor: '#dfdfdf',
                                                      
                                                    },
                                                    '& legend':{
                                                        color:'#dfdfdf'
                                                      }
                                                },
                                                "& .MuiFormLabel-root":{
                                                    color:'#dfdfdf'
                                                },

                                                "& .MuiInputBase-input":{
                                                    color:'#dfdfdf'
                                                },
                                                minWidth:'350px', 
                                                marginTop:'30px',
                                                color:'#dfdfdf'
                                                   
                                            }}
                                        />

                                        <TextField 
                                            fullWidth
                                            type="text"
                                            color="warning"
                                            variant='outlined'
                                            label = "Country"
                                            onBlur={formik.handleBlur}
                                            onChange = {formik.handleChange}
                                            value = {formik.values.country}
                                            name = 'country'
                                            error = {!!formik.touched.country && !!formik.errors.country} //!! - forced a value to be bool
                                            helperText = {!!formik.touched.country && formik.errors.country}
                                            sx={{
                                                
                                                "& .MuiOutlinedInput-root": {
                                                    '& fieldset': {
                                                      borderColor: '#dfdfdf',
                                                      
                                                    },
                                                    '& legend':{
                                                        color:'#dfdfdf'
                                                      }
                                                },
                                                "& .MuiFormLabel-root":{
                                                    color:'#dfdfdf'
                                                },

                                                "& .MuiInputBase-input":{
                                                    color:'#dfdfdf'
                                                },
                                                minWidth:'350px', 
                                                marginTop:'30px',
                                                color:'#dfdfdf'
                                                   
                                            }}
                                        />

                            <Box display='flex' justifyContent='end' mt="20px">
                                <Button type="submit" color="info" variant="contained" sx={{
                                    p:'15px',
                                    width:'100%',
                                    margin: '30px 0',
                                    '&:hover':{
                                        backgroundColor:'red',
                                                   
                                            }
                                    }}>
                                        Create new Hospital
                                </Button>
                                            
                            </Box>

                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
        <Notification notify = {hospitalStatusInfo} setNotify = {setHospitalStatusInfo} resetError = {auth.resetError} />
        
    </>
    
  )
}

export default AddNewHospital
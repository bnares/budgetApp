import { Box, CircularProgress, Fab } from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { green } from '@mui/material/colors';
import {removeWardFromDoctor} from "../../apiData/doctor/doctorData.js";
import { useAuth } from '../UseContext.js';
import EditIcon from '@mui/icons-material/Edit';

function DataGridActionButton(props) {
    const {params,rowId, setRowId} = props;
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const auth = useAuth();

    const handleSubmit = (id)=>{
       removeWardFromDoctor(auth.setError,auth.token,id,setLoading,setSuccess, setRowId);
    }

  return (
    <>
    {/* {console.log("Data grid Action button data params")}
    {console.log(params)} */}
    <Box sx={{
        m:1,
        position:'relative',
    }}>
        {success ? (
            <Fab color='primary' sx={{ width:50, height:50, bgcolor:green[500], '&:hover':{bgcolor:green[700]}}}>
                <CheckIcon />
            </Fab>
        ):(
            <Fab color='primary' sx={{ width:40, height:40}} disabled = {params.id!==rowId ||loading} onClick={()=>handleSubmit(params.id)}>
                <SaveIcon />
            </Fab>
        )}
        {loading && (<CircularProgress sx={{color:green[500], position:'absolute', top:0, left:0, zIndex:1}}/>)}
    </Box>
    </>
  )

}

export default DataGridActionButton
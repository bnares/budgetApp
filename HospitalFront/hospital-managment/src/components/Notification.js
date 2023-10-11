import { makeStyles, Snackbar } from '@material-ui/core';
import React from 'react'
import Alert from '@mui/material/Alert'

const useStyles = makeStyles(theme=>({
    root:{
        top: theme.spacing(9)
    }
}))

export default function Notification(props) {
    const {notify,setNotify,resetError} = props;
    const classes = useStyles();

const handleClose = (event,reason)=>{  //event is the default parameter exist in onClick and so on and reasn is another parameter which check what was the reason of openning this function
    //console.log("onClose of snackbar method");
    resetError();
    if(reason==='clickaway') return setNotify({isOpen:false, message:"", type:"error"})
    return setNotify({isOpen:false, message:"", type:"error"})
}

  return (
    <Snackbar
        open={notify.isOpen}
        autoHideDuration={5000}
        anchorOrigin = {{vertical:'top', horizontal:'right'}}
        className = {classes.root}
        onClose={handleClose}
    >
        <Alert severity={notify.type} onClose = {handleClose}>
            {notify.message}
        </Alert>
    </Snackbar>
    
  )
}

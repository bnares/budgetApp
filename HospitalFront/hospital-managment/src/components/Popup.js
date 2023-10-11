import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import ActionButton from './controls/ActionButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from './controls/Button';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/material';

const useStyle = makeStyles(theme=>({
    dialogWrapper:{
        padding: theme.spacing(2),
        position:'absolute',
        top:theme.spacing(5),
    },
    
    dialogTitle:{
        paddingRight:'0px'
    },

    cancelButton:{
        "&.MuiButtonBase-root":{
            width:"20px",
            backgroundColor: "#ff0461",
            padding:"5px",
            borderRadius:"0",
            "&:hover":{
                backgroundColor: "#ff0461",
            }
           },
    },

    updateButton:{
        "&.MuiButtonBase-root":{
            width:"150px",
            padding:"5px",
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
           },
    },

    mainContent:{
     
            /* width */
        "&::-webkit-scrollbar": {
            width: "10px",
        },
        
        /* Track */
        "&::-webkit-scrollbar-track": {
            background: "#f1f1f1"
        },
        
        /* Handle */
        "&::-webkit-scrollbar-thumb": {
            background: "#888"
        },
        
        /* Handle on hover */
        "&::-webkit-scrollbar-thumb:hover": {
            background: "#555"
        },

        },
        
        "&.MuiDialogContent-root":{
          
        }
      
    
    
}))

export default function Popup(props) {
    const {title,children, openPopup, setOpenPopup,avatar=null} = props;
    const classes = useStyle();
    
  return (  
    <Dialog disableEnforceFocus open= {openPopup} maxWidth="md" classes={{paper :classes.dialogWrapper}}>
        <DialogTitle className={classes.dialogTitle}>
            <div style = {{display:'flex'}}>
            <Typography variant='h6' component="div" style ={{flexGrow:1}}>
               <Box style={{display:'flex', alignItems:'center', justiContent:'center', gap:"5px", marginRight:"20px", marginLeft:"20px"}}>{avatar==null?"":avatar} {title}</Box>
            </Typography>
            <ActionButton 
                    color="secondary"
                    size="small"
                    startIcon={<CloseIcon />}
                    onClick = {()=>(setOpenPopup(false))}
                    className = {classes.cancelButton}
            >
            </ActionButton>
            </div>
        </DialogTitle>
        <DialogContent dividers className={classes.mainContent}>
            {children}
        </DialogContent>
        {/* <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Button text="UPDATE" className = {classes.updateButton} endIcon={<SendIcon />} onClick ={onClickFunction}/>
        </div> */}
        
    </Dialog>
  )
}

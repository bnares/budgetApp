import { DialogTitle,Dialog, DialogContent, DialogActions, Typography, IconButton } from '@mui/material'
import React from 'react'
import Button from '../controls/Button';
import {makeStyles} from '@material-ui/core/styles'
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

const useStyles = makeStyles(theme=>({
    dialog:{
        position:'absolute',
        top:theme.spacing(5),
        padding:theme.spacing(2),
    },

    dialogTitle:{
        textAlign:'center',
    },
    dialogContnet:{
        textAlign:'center',
    },
    dialogAction:{
        justifyContent:"center",
    },
    titleIcon:{
        //backgroundColor: theme.palette.secondary.light,
        //color:theme.palette.secondary.main,
        
        '& .MuiSvgIcon-root':{
            fontSize:'8rem',
        }
    }
}))

function ConfirmDialog(props) {
    const {confirmDialog, setConfirmDialog,handleConfirm} = props;
    const classes = useStyles();
  return (
    <Dialog open={confirmDialog.isOpen} className={classes.dialog}>
        <DialogTitle className={classes.dialogTitle}>
            <IconButton disableRipple className={classes.titleIcon}>
                <NotListedLocationIcon color='error'/>
            </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContnet}>
            <Typography variant = "h6">
                {confirmDialog.title}
            </Typography>
            <Typography variant = "subtitle2">
                {confirmDialog.subtitle}
            </Typography>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
            <Button text = "No" color="default" onClick={()=>setConfirmDialog({isOpen:false, title:"", subtitle:""})}/>
            <Button text = "Yes" color="secondary" onClick = {()=>handleConfirm()}/>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
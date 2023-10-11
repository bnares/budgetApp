import React from 'react'
import {Button as MuiButton, makeStyles } from '@material-ui/core'
import { padding } from '@mui/system';


const useStyle = makeStyles(theme=>({
    root:{
        margin:theme.spacing(0.5),
        width:"100%",
    },
    label:{
        textTransform:'none'
    }
}))

export default function Button(props) {
    const {text,size,color,variant,onClick, ...other} = props;
    const classes = useStyle();
  return (
    <MuiButton classes={{root:classes.root, label:classes.label }} size={size || "large"} color={color||"primary"} variant={variant||'contained'} onClick={onClick} {...other}>
        {text}
    </MuiButton>
  )
}

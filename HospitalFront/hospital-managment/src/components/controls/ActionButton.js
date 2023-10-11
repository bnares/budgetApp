import { makeStyles } from '@material-ui/core';
import React from 'react'
import Button from './Button';

const useStyle = makeStyles(theme=>({
    root:{
        minWidth:0,
        margin:theme.spacing(0.5),
        secondary:{
            backgroundColor:theme.palette.secondary.light,
            '& .MuiButton-label':{
                color:theme.palette.secondary.main,
            }
        },
        primary:{
            backgroundColor:theme.palette.primary.light,
            '& .MuiButton-label':{
                color:theme.palette.primary.main,
            }
        },
    }
}))

export default function ActionButton(props) {
    const {color,children,onClick,...other} = props;
    const classes = useStyle();
  return (
    <Button onClick={onClick} className = {`${classes.root} ${classes[color]}`} {...other}>
        {children}
    </Button>
  )
}

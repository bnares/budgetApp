import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyle = makeStyles(theme=>({
    root:{
        width:"100%",
     '& .MuiFormControl-root':{
         width:'100%',
         margin:theme.spacing(1)
     }
    }
 }))

export  function UseForm(initialFieldValues) {
    
    const [values, setValues] = React.useState(initialFieldValues)
    const [errors, setErrors] = React.useState({})

    const handleInputChange = e=>{
        const {name, value} = e.target
        setValues({...values, [name]:value})
    }

    const handleReset = ()=>{
        
        setValues(initialFieldValues);
        setErrors({});
    }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleReset
  }
}


export function Form(props){
    const classes = useStyle();
    const {children, ...other} = props;
    return(
    <form className={classes.root} autoComplete="off" onSubmit={other.onSubmit}>
        {children}
    </form>
    )
}

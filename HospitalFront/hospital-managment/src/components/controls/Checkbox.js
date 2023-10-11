import React from 'react'
import { FormControlLabel,FormGroup, InputLabel,Checkbox as MuiCheckbox,FormControl,FormLabel } from '@material-ui/core'

export default function Checkbox(props) {
  const { onChange,name, title, value} = props;

  const convertToDefaultParameter= (name,value)=>({
    target:{
      name,value
    }
  })

  console.log("value: "+value);
  return (
      <FormControlLabel control={<MuiCheckbox  checked={value} onChange={e=>onChange(convertToDefaultParameter(name, e.target.checked))} name={name}/>} label={title}/>
      
  )
}



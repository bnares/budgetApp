import { MenuItem, FormControl,Select as MuiSelect, InputLabel, FormHelperText } from '@material-ui/core';
import React from 'react'

export default function Select(props) {
    const {name,label,value,error=null,onChange,option,disabled=false, ...other} = props;
    
  return (
    <FormControl
        fullWidth variant='outlined'
        disabled = {disabled}
        {...(error&& {error:true})}
    >
        <InputLabel>{label}</InputLabel>
    <MuiSelect
        name={name}
        label={label}
        value = {value}
        onChange = {onChange}
        
    >
        {option.map((item,idx)=>(
            <MenuItem value = {item.id} key={idx}>{item.title}</MenuItem>
        )
        )
        }
    </MuiSelect>
    {error&&(<FormHelperText>{error}</FormHelperText>)}
    </FormControl>
  )
}

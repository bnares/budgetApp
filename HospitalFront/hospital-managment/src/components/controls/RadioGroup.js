import { FormControlLabel,FormControl, FormLabel,Radio, RadioGroup as MuiRadioGroup } from '@material-ui/core';
import { List, ListItem } from '@mui/material';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import React from 'react';
import AccessibleIcon from '@mui/icons-material/Accessible';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CategoryIcon from '@mui/icons-material/Category';



export default function RadioGroup(props) {
    const {name,label,value,onChange,items, iconsList=[]} = props;
    
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange} defaultValue={"0"}>
        <List>
          {
          items.map(
          (item,idx)=>( 
            <ListItem variant="outlined" key={idx}>
                
                <FormControlLabel key={idx} value={item.id} control={<Radio color="secondary"/>} label={item.title}/>
                <ListItemDecorator>
                  {iconsList.length>0?iconsList[idx]:<CategoryIcon />}
                </ListItemDecorator>
            </ListItem> 
            )
          )
          }
        </List>
       
                            
      </MuiRadioGroup>
    </FormControl>
  )
}

import React from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { UseForm } from '../../UseForm';
import Button from "../Button"
import { makeStyles } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';


const useStyles = makeStyles({
  AddNoteButton:{
    
    "&.MuiButtonBase-root":{
        width:"150px",
        padding:"5px",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        
       },
  },

  dateInput:{
    width:400,
  }
})

function AddNewNote(props) {
    const {patientData,confirmAddNote} = props;
    const [todayDay, setTodayDay] = React.useState(new Date());
    const [dateValue, setDateValue] = React.useState(null);
    const initialFormValues = {patientId:patientData.id, record:"", date:('0'+todayDay.getDate()).slice(-2)+'/'+("0"+(todayDay.getMonth()+1)).slice(-2)+'/'+todayDay.getFullYear()};
    const formData = UseForm(initialFormValues);
    const classes = useStyles();
   
    

    const handleDateChange = (newValue) => {
      setDateValue(newValue);
      formData.values.date = ('0'+newValue.getDate()).slice(-2)+'/'+("0"+(newValue.getMonth()+1)).slice(-2)+'/'+newValue.getFullYear();
    };

  return (
    <>
        {/* {console.log("formValues")}
        {console.log(formData.values)} */}
        <Box style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', gap:'20px', width:400}}>
          <TextareaAutosize 
                  minRows={5}
                  maxRows = {10}
                  style = {{maxWidth:400, maxHeight:450,width:400, height:200}}
                  //defaultValue = {formData.values.record}
                  name = "record"
                  value={formData.values.record}
                  onChange={(e)=>formData.handleInputChange(e)}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Select Date"
                inputFormat="dd/MM/yyyy"
                value={dateValue}
                onChange={(newValue)=>handleDateChange(newValue)}
                renderInput={(params) => <TextField {...params} />}
                className = {classes.dateInput}
              />
            </Stack>
          </LocalizationProvider>

          <Button text="ADD"  endIcon={<SendIcon />} onClick ={()=>confirmAddNote(formData.values)} className = {classes.AddNoteButton}/>
        </Box>
    </>
  )
}

export default AddNewNote
import React from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {useAuth} from "../../components/UseContext";
import { UseForm } from '../../components/UseForm';
import Button from '../../components/controls/Button';
import SendIcon from '@mui/icons-material/Send';
import {makeStyles} from '@material-ui/core';
import Popup from '../../components/Popup';
import Notification from '../../components/Notification';
import {updatePatientsCard,doctorsPatients} from "../../apiData/doctor/doctorData"
const useStyle = makeStyles(theme=>(
  {
    updateButton:{
      "&.MuiButtonBase-root":{
          width:"150px",
          padding:"5px",
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
         },
  }
}))

function PatientCardModification(props) {
    const {choosenPatientGridTableData,setChoosenPatientGridTableData,setOpenPopup,setOpenPatientCardNotification,setPatientsList,patientsList,setRefreshDataGridTable} = props;
    const classes = useStyle();
    const auth = useAuth();
    //const [openPatientCardNotification, setOpenPatientCardNotification] = React.useState({isOpen:false, message:"", type:"success"});
    let notes =choosenPatientGridTableData.notes.length>1?choosenPatientGridTableData.notes.sort((noteONe,noteTwo)=>(Number(new Date(noteTwo.date))-Number(new Date(noteONe.date))))[0]:choosenPatientGridTableData.notes[0];
    const {values, setValues, errors, setErrors,handleInputChange,handleReset} = UseForm({isOpen:false, message:"", type:"success"});
    let patientCardData = {record:values.record, noteId:notes.id, patientCardId:choosenPatientGridTableData.patientCardId, patientId:choosenPatientGridTableData.patientId};
    
    
    const confirmUpdate =  (patientCardData)=>{
      
      if(patientCardData.record===undefined && patientCardData.isOpen==false){
        setOpenPatientCardNotification({isOpen:true, message:"Error Occured", type:"error"})
      }
      else if(patientCardData.record===undefined){
        setOpenPatientCardNotification({isOpen:true, message:"Fill in Note field", type:"info"})
      }else{
        updatePatientsCard(patientCardData,setErrors,auth.token,setOpenPopup,setOpenPatientCardNotification);
        for(let i =0; i<patientsList.length; i++){
          if(patientsList[i].id==patientCardData.patientId){
            for(let x= 0;x<patientsList[i].patientCard.notes.length;x++){
              if(patientsList[i].patientCard.notes[x].id==patientCardData.noteId){
                patientsList[i].patientCard.notes[x].record = patientCardData.record;
              }
            }
          }
        }
        let notes = choosenPatientGridTableData.notes;
        for(let i =0; i<notes.length; i++){
          if(notes[i].id==patientCardData.noteId){
            notes[i].record = patientCardData.record;
            choosenPatientGridTableData.notes[i].record = patientCardData.record;

          }
        }
        
        setRefreshDataGridTable(prev=>!prev);
      }
      handleReset();
    }

  return (
    <>
      <div style={{maxWidth:"500px"}}>
        <TextareaAutosize 
          minRows={5}
          maxRows = {10}
          style = {{maxWidth:500}}
          defaultValue = {notes.record}
          name = "record"
          value={values.record}
          onChange={(e)=>handleInputChange(e)}
        />
      </div>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
              <Button text="UPDATE" className = {classes.updateButton} endIcon={<SendIcon />} onClick ={()=>confirmUpdate(patientCardData)}/>
      </div>
      {/* <Notification notify = {openPatientCardNotification.isOpen} setNotify={setOpenPatientCardNotification} resetError={auth.resetError}/> */}
    </>
    
  )
}

export default PatientCardModification
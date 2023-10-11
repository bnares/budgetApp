import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { makeStyles } from '@material-ui/core';
import { Hidden } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { UseForm } from '../UseForm';
import Button from "../../components/controls/Button"
import SendIcon from '@mui/icons-material/Send';
import {useAuth} from "../UseContext";


const useStyles = makeStyles({

  
  mainContentBox:{
    
    maxHeight:450,
    marginTop:0,
    "&.MuiDialogContent-root":{
      
    },
    listRoot: {
     
      maxHeight: 450,
      overflow: 'auto',
      '& li:hover': {
          cursor: 'pointer',
          backgroundColor: '#E3E3E3'
      },
      '& li:hover .MuiButtonBase-root': {
          display: 'block',
          color: '#000',
      },
      '& .MuiButtonBase-root': {
          display: 'none'
      },
      '& .MuiButtonBase-root:hover': {
          backgroundColor: 'transparent'
      }
  }
  },
  scrollBar: {
    "&::-webkit-scrollbar": {
      width: "3px",
    },

    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 5px rgb(255, 251, 251)",
      borderRadius: "10px",
    },
 
    "&::-webkit-scrollbar-thumb": {
      background: "#077DFA",
      borderRadius: "10px",
    },

    "&::-webkit-scrollbar-thumb:hover": {
      background: "rgb(255, 251, 251)",
    }
  },

  updateButton:{
    
    "&.MuiButtonBase-root":{
        width:"150px",
        padding:"5px",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        
       },
  },

  
})

function PatientsList(props) {
  const {sortedByDatePatientsList,title, clickedRowPatient,confirmUpdate} = props;
  const initialFormValues = {patientId:"", patientCardId:"", noteId:"", record:""};
  const auth = useAuth();
  const formData = UseForm(initialFormValues);
  const classes = useStyles();
  const[ selectedPatientFilterData, setSelectedPatientFilterData] = React.useState([]);
  const [openSideWindow, setOpenSideWindow] = React.useState(false);
  const [clickedNoteData, setClickedNoteData] = React.useState({});
  const [emptyHisotryText, setEmptyHisotryText] = React.useState("");
  

  const listItemButtonClicked = (item)=>{
    
    setClickedNoteData({noteId:item.id, record:item.record, date:item.date.slice(0,10)})
    formData.values.patientCardId = item.patientCardId;
    formData.values.noteId = item.id;
    formData.values.record = item.record;
    getTheRightPatientData();
    setOpenSideWindow(true);
  }

  const getTheRightPatientData = ()=>{
    let clickedPatientCards = [];
    setSelectedPatientFilterData([]);
    sortedByDatePatientsList.forEach(item=>{
      if(item.patientId==clickedRowPatient.id){
        clickedPatientCards.push(item);
        formData.values.patientId = clickedRowPatient.id;
      }
    })
    if(clickedPatientCards.length==0) setEmptyHisotryText(`Patient ${clickedRowPatient.name} ${clickedRowPatient.surname}'s history is empty`)
    setSelectedPatientFilterData(clickedPatientCards);
  }

  const updateNote = ()=>{
    confirmUpdate(formData.values);
    auth.patientsList.forEach(patient=>{
      if(patient.id==formData.values.patientId){
        patient.patientCard.notes.forEach(note=>{
          if(note.id==formData.values.noteId){
            note.record=formData.values.record;
          }
        })
      }
    })
    formData.handleReset();
  }  

  React.useEffect(()=>{
    getTheRightPatientData();
  },[])

  return (
    <>
    <Grid container spacing={2} className={classes.mainContentBox}>
      <Grid item xs={12}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            {emptyHisotryText=="" ? title : emptyHisotryText}
        </Typography>
        <Box style={{display:'flex', justiContent:'center', alignItems:'flexStart', alignContent:"flexStart"}} className={classes.scrollBar}>
          <List className={classes.listRoot}>
            
            {selectedPatientFilterData.map((item,idx)=>(
              <ListItem key={idx} 
                secondaryAction={
                  <IconButton edge="end"  aria-label="delete" onClick={(event)=>listItemButtonClicked(item)}>
                    <DoubleArrowIcon/>
                  </IconButton>
                }
              >
                <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                </ListItemAvatar>
                <ListItemText
                      primary={item.surname+" "+item.name}
                      secondary={item.date.slice(0,10)}
                />
              </ListItem>
            ))}
          </List>
          <Box>
            {openSideWindow ? 
            <Box style={{ width:"400px", height:"100%", padding:"10px",display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',gap:"20px",margin:"10px"}}>
              
              <TextareaAutosize 
                minRows={5}
                maxRows = {10}
                style = {{maxWidth:400, maxHeight:450,width:400, height:200}}
                //defaultValue = {clickedNoteData?.record}
                name = "record"
                value={formData.values.record}
                onChange={(e)=>formData.handleInputChange(e)}
              />
              <Button text="UPDATE" className = {classes.updateButton} endIcon={<SendIcon />} onClick ={()=>updateNote()}/>
            </Box> : null}
          </Box>
        </Box>
      </Grid>
    </Grid>
    </>
  )
}

export default PatientsList